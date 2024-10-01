# Signing Git Commits

## Introduction

From the *Git User Manual*:

> Git is cryptographically secure, but it's not foolproof. If you're taking work
> from others on the internet and want to verify that commits are actually from
> a trusted source, Git has a few ways to sign and verify work using GPG.

As Ed-Fi source repositories have embraced the Apache License, it is more
important than ever that we ensure pull requests and commits are well
identified. Although anyone can submit a pull request, we only want to accept
the pull request if the contributor has accepted the [Contributor License
Agreement](https://gist.github.com/EdFiBuildAgent/d68fa602d07505c3682e8258b7dc6fbc)
(CLA). Signing Git commits allows us to both verify the identity of the
developer and to verify that the developer has signed the CLA.

## One-Time Setup on Windows

### 1. Install Gnu Privacy Guard (GPG)

If you use Git Bash, then you already have GPG at path /usr/bin/gpg .

If you use PowerShell or cmd.exe, then you will need to install GPG. The
simplest way to install GPG is with chocolatey:

```shell
choco install -y gpg4win
```

Alternately, you can download and install
from [GPG4Win](https://www.gpg4win.org).

### 2. Generate a Key

The default key length is 2048 bit. 4096 is even better. You'll be prompted for
name and email. You should use the same "commit email address" as you have
[configured in
GitHub](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address).

```shell
gpg --default-new-key-algo rsa4096 --gen-key
```
:::warning

This key will expire after two years.

:::

### 3. Configure Git to Always Sign

You will need the key ID for this. In the following example from the Git manual,
the id is "E1E474F2023B5ABFF8752630BB4".

```shell
gpg --list-keys
```

The command above will produce output similar to the following.

```none
C:/Users/jon.doe/AppData/Roaming/gnupg/pubring.kbx
------------------------------------------------
pub rsa4096 2020-05-24 [SC] [expires: 2022-04-22]
    E1E474F2023B5ABFF8752630BB4

uid         [ultimate] Jon Doe <jon.doe@examppppppplllleeeee.com>
```

Configure this globally, or set it up one repository at a time by omitting the
`--global argument`. Additionally, configure the GPG.exe to be used by Git.  GPG
is usually found at `C:\Program Files (x86)\GnuPG\bin\gpg.exe.` In some
installations, it might instead be in
`%LOCALAPPDATA%\Local\Programs\GnuPG\bin\gpg.exe`

```shell
git config --global user.signingkey E1E474F2023B5ABFF8752630BB4

git config --global gpg.program "C:\Program Files(x86)\GnuPG\bin\gpg.exe"

git config --global commit.gpgsign true

git config --global tag.gpgsign true

# If you need to change your commit email address to match what is in
GitHub

git config --global user.email "YOUR_EMAIL"
```

:::note

If you would prefer to take manual control of when to sign a commit or
tag, you can skip the the `commit.gpgsign`  and `tag.gpgsign` configurations
above. To sign a tag, add flag `-s` . To sign a commit, >add flag `-S` . *Yes,
the difference in capitalization is critical*.

With the configuration settings above, you have no need to add the s/S flag.

:::

### 4. Upload the Key to GitHub

Export the key using that same key id from above.

```shell
gpg --armor --export E1E474F2023B5ABFF8752630BB4
```

This will display your PGP Public Key Block. Copy the text, beginning
with `-----BEGIN PGP PUBLIC KEY BLOCK-----`  and ending with `-----END PGP
PUBLIC KEY BLOCK-----`.

Open [github.com/settings/keys](https://github.com/settings/keys), click the
"New GPGP Key" button, and then paste and save the copied public key.

## One-Time Setup on Linux and Mac

Please see [GPG2 (GnuGP 2)
Guide](https://docs.releng.linuxfoundation.org/en/latest/gpg.html), then see
step 4 above.

## One-Time Setup in Windows Sub-system for Linux (WSL)

As the Alliance deepens its use of pure open source systems, including support
for running applications in Linux, some development practices might benefit from
running on the Windows Sub-system for Linux (WSL). The following notes were
written while using [Ubuntu](https://www.ubuntu.com/wsl) and they assume that
the Windows instructions above have already been completed.

Pure Linux-developers probably know these commands or can easily follow along.

### 1. Install Git

See [Get started using Git on Windows Subsystem for
Linux](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-git)

### 2. Copy the Key Created in Windows

To reuse the same key that you already configured in Windows, open Ubuntu and
run:

```shell
cp /mnt/c/users/john.doe/AppData/Roaming/gnupg ~/.gnupg -r
rm ~/.gnupg/*.lock
```

### 3. Configure Git to Always Sign

You will need the key ID for this. In the following example from the Git manual,
the id is "E1E474F2023B5ABFF8752630BB4".

```shell
gpg --list-keys
```

The command above will produce output similar to the following.

```none
/home/john.doe/.gnupg/pubring.kbx
-------------------------------------------------
pub rsa4096 2020-05-24 [SC] [expires: 2022-04-22]
    E1E474F2023B5ABFF8752630BB4
uid         [ultimate] Jon Doe <jon.doe@examppppppplllleeeee.com>
```

Configure this globally, or set it up one repository at a time by omitting the
`--global` argument. Additionally, configure the GPG.exe to be used by Git.

```shell
git config --global user.signingkey E1E474F2023B5ABFF8752630BB4
git config --global commit.gpgsign true
git config --global tag.gpgsign true
```

### 4. Configure the GPG Agent

[*original source of
instructions*](https://www.39digits.com/signed-git-commits-on-wsl2-using-visual-studio-code)

Create a new gpg-agent.conf file by entering the following command in your Bash
prompt:

```shell
cat > ~/.gnupg/gpg-agent.conf <<EOF
default-cache-ttl 34560000
max-cache-ttl 34560000
pinentry-program "/mnt/c/Program Files (x86)/GnuPG/bin/pinentry-basic.exe"
EOF
```

Now restart the GPG Agent. You might need to close the Ubuntu terminal window as
well.

```shell
gpgconf --kill gpg-agent
```

### 5. Switch to Windows GPG If Needed

The instructions above do not always work. If you get a message like this:

```shell
error: gpg failed to sign the data
fatal: failed to write commit object
```

Then try configuring Git to use the Windows version of gpg, instead of using the
WSL copy.

```shell
git config --global gpg.program "/mnt/c/Program Files (x86)/GnuPG/bin/gpg.exe"
```

## Practice

For those who are just starting out with using git commit signatures, we\'ve
created a simple [training
repository](https://github.com/Ed-Fi-Exchange-OSS/training) in Git which you can
use to practice:

1. Fork [the repository](https://github.com/Ed-Fi-Exchange-OSS/training) and
   clone it locally.
2. Make a small change to the [test.md](http://test.md) file.
3. Commit it, using the signature process described above.
4. Push your commit to your fork.
5. Create a pull request back to the main repository.
6. Reach out to the Ed-Fi Alliance tech team or a solution architect for help in
   verifying and accepting the pull request.

## Troubleshooting

### Need to Sign Previous Commit(s)

If your last commit was not signed, you can use `git commit -S --amend
--no-edit` to fix it. If you have multiple old commits that now need to be
signed, you can try rebasing them and amending.
See ["Is there a way to gpg sign all previous commits?"](https://stackoverflow.com/a/54987693/30384).

### Error Message: "cannot open '/dev/tty'"

Atlassian SourceTree may have a problem with the instructions above, giving you
an error message like:

```shell
gpg: cannot open '/dev/tty': Device not configured

error: gpg failed to sign the data
fatal: failed to write commit object
```

To resolve, either [Setup GPG to sign commits in
SourceTree](https://confluence.atlassian.com/sourcetreekb/setup-gpg-to-sign-commits-within-sourcetree-765397791.html)
or disable tty:

```shell
echo 'no-tty' >> ~/.gnupg/gpg.conf
```

### Error Message: "No secret key"

If the following error message occurs after attempting a commit:

```shell
gpg: skipped "xxxxxxxxxxxxxxxxxx": No secret key
gpg: signing failed: No secret key
error: gpg failed to sign the data
fatal: failed to write commit object
```

Open a Git Bash session and type find the location of gpg on the command line:

```shell
# If using separate install
where gpg
C:\Program Files\Git\usr\bin\gpg.exe

# If using version that comes with Git-bash
which gpg
/usr/bin/gpg
```

Next, set gpg.program to the path returned from the where command:

```shell
git config --global gpg.program "C:\Program Files\Git\usr\bin\gpg.exe"

# Or

git config --global gpg.program "/usr/bin/gpg"
```

### Error Message: "No agent running"

On rare occasions the commit signing might fail with a message like this:

```shell
git commit -m "my commit message"
gpg: can't connect to the agent: IPC connect call failed
gpg: keydb_search failed: No agent running
gpg: signing failed: No agent running
error: gpg failed to sign the data
fatal: failed to write commit object
```

The reason for this failure is not clear. The solution seems to be to run the
gpg-agent from the command line, at least temporarily. Assuming you are using
Windows, open a new prompt (cmd, PowerShell, or Git-bash - but not a WSL prompt)
and run this:

```shell
gpg-agent --daemon
```

Now return to your IDE or other command prompt and re-try the `git commit`
command. If it is successful, you might be able to return to the second window
and Control-C out of the daemon.

### Error Message: "Unusable Secret Key"

This likely means that your key has expired and needs to be replaced, following
the directions above. You can check the expiration at the command line:

```shell
PS C:\> gpg --list-keys
gpg: checking the trustdb
gpg: marginals needed: 3 completes needed: 1 trust model: pgp
gpg: depth: 0 valid: 3 signed: 0 trust: 0-, 0q, 0n, 0m, 0f, 3u
gpg: next trustdb check due at 2024-09-20
C:/Users/<username>/AppData/Roaming/gnupg/pubring.kbx
--------------------------------------------------------
pub rsa4096 2021-02-27 [SC] [expired: 2023-02-27]
    252F4DBC8A0D31955DA7207A3001A25B6798D8E9
uid          [ expired] <...>
```
