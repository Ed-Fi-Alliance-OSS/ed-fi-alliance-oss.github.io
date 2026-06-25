---
name: upload-images-to-azure
description: Upload local .webp images to Azure blob storage, auto-update markdown references, and commit. Usage: /upload-images-to-azure <local_path>
---

# Azure Image Upload Skill

Automates the full workflow: validates images, analyzes git to suggest which markdown files to scan, uploads to Azure, updates references, deletes local files, and creates a commit.

## Workflow

1. **Path Validation** — Check directory exists, contains only .webp files
2. **Git Analysis** — Find uncommitted /static changes and commits on branch not in main
3. **User Selection** — Show candidate markdown files, ask which to scan
4. **Image Discovery** — Find all .webp files and count their references in markdown
5. **Summary & Confirmation** — Show what will happen, ask user to proceed
6. **Execution** — Upload, verify, update markdown, delete local files, commit

## Implementation

```powershell
# ============================================================================
# SECTION: Argument Processing & Path Validation
# ============================================================================
# Validates that a local directory path was provided and that the directory
# exists. Exits immediately if path is invalid or missing.

$Arguments = "$ARGUMENTS".Trim()

if ([string]::IsNullOrWhiteSpace($Arguments)) {
    Write-Host "Error: Please provide a local path. Usage: /upload-images-to-azure <local_path>"
    exit 1
}

$localPath = $Arguments

# Validate path exists
if (-not (Test-Path $localPath -PathType Container)) {
    Write-Host "Error: Directory '$localPath' does not exist or is not a directory."
    exit 1
}

# ============================================================================
# SECTION: Image Discovery & Validation
# ============================================================================
# Scans the directory for .webp images and rejects any non-.webp files.
# Only .webp images are supported (enforces consistent image format).
# Exits if directory is empty or contains unsupported file types.

$images = @(Get-ChildItem -Path $localPath -File | Where-Object { $_.Extension -eq '.webp' })
$nonWebpFiles = @(Get-ChildItem -Path $localPath -File | Where-Object { $_.Extension -ne '.webp' })

# Reject if non-.webp files present
if ($nonWebpFiles.Count -gt 0) {
    Write-Host "Error: Found non-.webp images in '$localPath':"
    $nonWebpFiles | ForEach-Object { Write-Host "  - $($_.Name)" }
    Write-Host "`nOnly .webp images are supported. Please optimize and convert your images."
    exit 1
}

# Inform if no images found
if ($images.Count -eq 0) {
    Write-Host "No .webp images found in '$localPath'. Nothing to upload."
    exit 0
}

Write-Host "✓ Found $($images.Count) .webp image(s) in '$localPath'"

# ============================================================================
# SECTION: Git Analysis
# ============================================================================
# Analyzes git history to identify which markdown files may need updates.
# Finds uncommitted changes in /static and commits on current branch that
# touched both /static and markdown files. Suggests these markdown files as
# candidates for image reference updates. Gracefully handles detached HEAD.

Write-Host "`n=== Git Analysis ==="

# Get current branch
$currentBranch = git rev-parse --abbrev-ref HEAD 2>$null
if (-not $currentBranch -or $currentBranch -eq "HEAD") {
    Write-Host "⚠ Warning: Detached HEAD state. Skipping git hints."
    $gitHintsAvailable = $false
} else {
    $gitHintsAvailable = $true
}

$staticChanges = @()
$candidateMarkdownFiles = @()

if ($gitHintsAvailable) {
    # Find uncommitted changes in /static
    $uncommittedStatic = @(git diff --name-only --diff-filter=d | Where-Object { $_ -match '^static/' })
    
    # Find commits on this branch not in main that touch /static
    $commits = @(git log main..$currentBranch --pretty=format:"%H" 2>$null | Where-Object { $_ })
    
    if ($uncommittedStatic.Count -gt 0) {
        Write-Host "Found uncommitted changes in /static:"
        $uncommittedStatic | ForEach-Object { Write-Host "  - $_" }
        $staticChanges += $uncommittedStatic
    }
    
    # For each commit touching /static, find markdown files modified around the same time
    foreach ($commit in $commits) {
        $filesInCommit = @(git show --name-only --pretty="" $commit | Where-Object { $_ })
        $hasStaticChanges = @($filesInCommit | Where-Object { $_ -match '^static/' }).Count -gt 0
        $markdownInCommit = @($filesInCommit | Where-Object { $_ -match '\.md[x]?$' })
        
        if ($hasStaticChanges -and $markdownInCommit.Count -gt 0) {
            $candidateMarkdownFiles += $markdownInCommit
        }
    }
}

# Remove duplicates
$candidateMarkdownFiles = @($candidateMarkdownFiles | Select-Object -Unique)

if ($staticChanges.Count -eq 0 -and $candidateMarkdownFiles.Count -eq 0) {
    Write-Host "ℹ No recent /static changes or markdown modifications found on this branch."
} else {
    if ($candidateMarkdownFiles.Count -gt 0) {
        Write-Host "`nFound markdown files modified on this branch (likely need image reference updates):"
        $candidateMarkdownFiles | ForEach-Object { Write-Host "  - $_" }
    }
}

# ============================================================================
# SECTION: User Selection of Markdown Files
# ============================================================================
# Presents git-suggested markdown files to the user and asks which should be
# scanned for image references. User can choose: 'all' (use all suggestions),
# 'none' (skip updates), or provide comma-separated paths. Validates paths
# exist before adding to scan list.

Write-Host "`n=== Select Markdown Files to Scan ==="

if ($candidateMarkdownFiles.Count -gt 0) {
    Write-Host "Suggested markdown files (based on git analysis):"
    $candidateMarkdownFiles | ForEach-Object { Write-Host "  ✓ $_" }
    Write-Host ""
}

Write-Host "Which markdown files should I scan for image references?"
Write-Host "Options:"
Write-Host "  - 'all' — scan all suggested files"
Write-Host "  - 'none' — don't scan any (just upload and delete)"
Write-Host "  - comma-separated paths (e.g., 'docs/file1.md, docs/file2.md')"
Write-Host ""

$userInput = Read-Host "Enter your choice"

$markdownFilesToScan = @()

if ($userInput -eq "all") {
    $markdownFilesToScan = $candidateMarkdownFiles
} elseif ($userInput -eq "none") {
    $markdownFilesToScan = @()
} else {
    # Parse comma-separated paths
    $paths = $userInput -split ',' | ForEach-Object { $_.Trim() }
    foreach ($path in $paths) {
        if (Test-Path $path -PathType Leaf) {
            $markdownFilesToScan += $path
        } else {
            Write-Host "⚠ Warning: File '$path' not found. Skipping."
        }
    }
}

Write-Host "`n✓ Will scan $($markdownFilesToScan.Count) markdown file(s) for image references"

# ============================================================================
# SECTION: Image Reference Discovery
# ============================================================================
# Scans each selected markdown file for exact filename matches (using regex
# escape to avoid false positives). Counts references per image and tracks
# which files contain each reference. Separates referenced vs. unreferenced
# images in output summary.

Write-Host "`n=== Image Reference Discovery ==="

$imageReferences = @{}

foreach ($image in $images) {
    $filename = $image.Name
    $count = 0
    $foundIn = @()
    
    foreach ($mdFile in $markdownFilesToScan) {
        # Search for exact filename matches in the markdown file
        $matches = @(Select-String -Path $mdFile -Pattern ([regex]::Escape($filename)) -ErrorAction SilentlyContinue)
        if ($matches.Count -gt 0) {
            $count += $matches.Count
            $foundIn += $mdFile
        }
    }
    
    $imageReferences[$filename] = @{
        count = $count
        files = $foundIn
    }
}

# Report findings
$referencedImages = @($imageReferences.Keys | Where-Object { $imageReferences[$_].count -gt 0 })
$unreferencedImages = @($imageReferences.Keys | Where-Object { $imageReferences[$_].count -eq 0 })

if ($referencedImages.Count -gt 0) {
    Write-Host "Found image references:"
    $referencedImages | ForEach-Object {
        $ref = $imageReferences[$_]
        Write-Host "  ✓ $_ — found $($ref.count) time(s) in $($ref.files.Count) file(s)"
    }
}

if ($unreferencedImages.Count -gt 0) {
    Write-Host "Images with no references in selected markdown (will still be uploaded):"
    $unreferencedImages | ForEach-Object {
        Write-Host "  ✗ $_"
    }
}

# Calculate mirrored Azure path (relative path after $web)
$relativePath = ($localPath -replace '^\./', '').Replace('\', '/')
$azureDestinationPath = $relativePath
$azureBaseUrl = "https://edfidocs.blob.core.windows.net/`$web"

# ============================================================================
# SECTION: Pre-Execution Summary & Confirmation
# ============================================================================
# Displays comprehensive summary of what will happen: images to upload (with
# total size), Azure destination, markdown files to scan, reference updates
# needed, local files to delete, and commit message. Asks user for explicit
# 'y' or 'yes' confirmation before proceeding. Exits cleanly if user declines.

Write-Host "`n=== Pre-Execution Summary ==="

# Calculate total size
$totalSize = ($images | Measure-Object -Property Length -Sum).Sum
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)

Write-Host "`nImages to upload ($($images.Count) files, $totalSizeMB MB total):"
$images | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "  ✓ $($_.FullName) ($sizeMB MB)"
}

Write-Host "`nAzure destination:"
Write-Host "  → $azureBaseUrl/$azureDestinationPath/"

Write-Host "`nMarkdown files to scan ($($markdownFilesToScan.Count) files):"
if ($markdownFilesToScan.Count -eq 0) {
    Write-Host "  (none)"
} else {
    $markdownFilesToScan | ForEach-Object { Write-Host "  ✓ $_" }
}

Write-Host "`nImage references found (and will be updated):"
$referencedImages | ForEach-Object {
    $ref = $imageReferences[$_]
    Write-Host "  ✓ $_ → found $($ref.count) time(s)"
}

Write-Host "`nLocal files to delete (after successful upload):"
$images | ForEach-Object { Write-Host "  ✗ $($_.FullName)" }
Write-Host "  ✗ $localPath (directory, if empty)"

Write-Host "`nGit commit to create:"
Write-Host "  [branch] doc: upload images to Azure blob storage"

Write-Host ""
$confirmation = Read-Host "Proceed with upload, markdown updates, and commit? (y/n)"

if ($confirmation -ne "y" -and $confirmation -ne "yes") {
    Write-Host "Aborted. No changes made."
    exit 0
}

# ============================================================================
# SECTION: Execution Phase
# ============================================================================
# Executes the complete workflow: uploads images to Azure, verifies public
# accessibility, updates markdown files with Azure URLs, deletes local files
# and empty directories, and creates a git commit. Errors at any stage cause
# exit with code 1. All steps designed to be idempotent where possible.

Write-Host "`n=== Executing ==="

# Upload images to Azure
Write-Host "Uploading $($images.Count) image(s) to Azure..."

try {
    $uploadArgs = @(
        'storage', 'blob', 'upload-batch',
        '--account-name', 'edfidocs',
        '--destination', '$web',
        '--source', $localPath,
        '--destination-path', $azureDestinationPath,
        '--content-type', 'image/webp',
        '--auth-mode', 'login'
    )
    
    $uploadOutput = & az @uploadArgs 2>&1
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Azure upload failed."
        Write-Host $uploadOutput
        exit 1
    }
    
    Write-Host "✓ Successfully uploaded $($images.Count) image(s) to Azure"
} catch {
    Write-Host "Error: Failed to execute Azure CLI command."
    Write-Host $_.Exception.Message
    exit 1
}

# Verify one blob is publicly accessible
Write-Host "Verifying blob accessibility..."

$firstImage = $images[0].Name
$testUrl = "$azureBaseUrl/$azureDestinationPath/$firstImage"

try {
    $response = Invoke-WebRequest -Method Head -Uri $testUrl -SkipHttpErrorCheck -TimeoutSec 10
    
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Verified: Blob is publicly accessible (HTTP 200)"
    } else {
        Write-Host "⚠ Warning: Blob returned HTTP $($response.StatusCode). It may not be publicly accessible."
    }
} catch {
    Write-Host "⚠ Warning: Could not verify blob accessibility. Continuing anyway."
}

# Update markdown files with Azure URLs
if ($markdownFilesToScan.Count -gt 0) {
    Write-Host "`nUpdating markdown references..."
    
    foreach ($mdFile in $markdownFilesToScan) {
        $content = Get-Content -Path $mdFile -Raw
        $originalContent = $content
        
        # Detect if already has Azure URLs and skip
        if ($content -match "edfidocs\.blob\.core\.windows\.net") {
            Write-Host "⚠ Warning: '$mdFile' already contains Azure URLs. Skipping to avoid double-updates."
            continue
        }
        
        $updateCount = 0
        
        foreach ($image in $images) {
            $filename = $image.Name
            $azureUrl = "$azureBaseUrl/$azureDestinationPath/$filename"
            
            # Replace ENTIRE PATH REFERENCE (not just filename) with Azure URL
            # Pattern 1: ![alt](any-path/containing/filename) → ![alt](azureUrl)
            # Pattern 2: [text](any-path/containing/filename) → [text](azureUrl)
            # This avoids replacing bare filenames in plain text
            
            $escapedFilename = [regex]::Escape($filename)
            
            # Match markdown images with paths containing the target filename
            # Captures: ![alt]( + any-path + filename) and replaces path portion with Azure URL
            $pattern = "!\[([^\]]*)\]\([^)]*" + $escapedFilename + "[^)]*\)"
            $replacement = "![$1]($azureUrl)"
            
            $content = [regex]::Replace($content, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            
            # Match markdown links with paths containing the target filename
            # Captures: [text]( + any-path + filename) and replaces path portion with Azure URL
            $pattern = "\[([^\]]+)\]\([^)]*" + $escapedFilename + "[^)]*\)"
            $replacement = "[$1]($azureUrl)"
            
            $content = [regex]::Replace($content, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            
            # Check if replacements were made
            if ($content -ne $originalContent) {
                $updateCount += 1
            }
        }
        
        # Write updated content back
        if ($content -ne $originalContent) {
            Set-Content -Path $mdFile -Value $content
            Write-Host "✓ Updated $mdFile"
        }
    }
    
    Write-Host "✓ Updated $($markdownFilesToScan.Count) markdown file(s)"
}

# Delete local image files
Write-Host "`nCleaning up local files..."

foreach ($image in $images) {
    Remove-Item -Path $image.FullName -Force -ErrorAction SilentlyContinue
    Write-Host "  ✗ Deleted $($image.Name)"
}

# Delete the local directory if it's now empty
if ((Get-ChildItem -Path $localPath -ErrorAction SilentlyContinue | Measure-Object).Count -eq 0) {
    Remove-Item -Path $localPath -Force -ErrorAction SilentlyContinue
    Write-Host "  ✗ Deleted empty directory $localPath"
}

Write-Host "✓ Cleanup complete"

# Stage and commit changes
Write-Host "`nCreating git commit..."

try {
    # Stage markdown file changes and deletions
    foreach ($mdFile in $markdownFilesToScan) {
        if (Test-Path $mdFile) {
            & git add $mdFile
        }
    }
    
    # Stage image deletions (git tracks the deletion)
    & git add $localPath 2>$null
    
    # Commit with standard message
    $commitOutput = & git commit -m "doc: upload images to Azure blob storage" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Commit created"
        # Extract and show commit hash
        if ($commitOutput -match '\[.*?\s+([a-f0-9]+)\]') {
            $commitHash = $matches[1]
            Write-Host "  Hash: $commitHash"
        }
    } elseif ($commitOutput -match "nothing to commit") {
        Write-Host "ℹ No changes to commit"
    } else {
        Write-Host "⚠ Warning: Commit may have failed"
        Write-Host $commitOutput
    }
} catch {
    Write-Host "⚠ Warning: Git commit failed. Changes may need to be committed manually."
    Write-Host $_.Exception.Message
}

Write-Host "`n=== SUCCESS ==="
Write-Host "Azure Image Upload Completed!"
Write-Host ""
Write-Host "Uploaded images:"
$images | ForEach-Object {
    $url = "$azureBaseUrl/$azureDestinationPath/$($_.Name)"
    Write-Host "  ✓ $url"
}
Write-Host ""
Write-Host "Updated markdown: $($markdownFilesToScan.Count) file(s)"
Write-Host "Local files: Deleted"
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Push your changes: git push"
Write-Host "  2. Create a PR and request code review"
```
