"""Shared helpers for the Data Standard content audit scripts.

Run all scripts from the repository root, e.g.:
    python3 drafts/data-standard-audit/scripts/inventory.py
"""

import re
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
AUDIT = REPO / "drafts" / "data-standard-audit"
WORKING = AUDIT / "working"
BUILD = REPO / "build"

DS_ROOT = REPO / "dataStandard_versioned_docs"
DS_VERSIONS = ["3", "4", "5", "6"]
# Latest version is served without a version segment (lastVersion: '6').
DS_LATEST = "6"
DS_ROUTE = "reference/data-exchange/data-standard"

UDM_ROOT = REPO / "docs" / "reference" / "1-data-exchange" / "udm"
DATA_STANDARDS_PAGE = REPO / "docs" / "reference" / "1-data-exchange" / "data-standards.md"
REFERENCE_ROOT = REPO / "docs" / "reference"


def iter_pages(sets=("3", "4", "5", "6", "udm")):
    """Yield (set_name, path, rel_path) for in-scope Markdown/MDX pages."""
    for s in sets:
        if s == "udm":
            for p in sorted(UDM_ROOT.rglob("*.md*")):
                yield "udm", p, p.relative_to(REFERENCE_ROOT).as_posix()
            yield "udm", DATA_STANDARDS_PAGE, DATA_STANDARDS_PAGE.relative_to(REFERENCE_ROOT).as_posix()
        else:
            root = DS_ROOT / f"version-{s}"
            for p in sorted(root.rglob("*.md*")):
                yield f"v{s}", p, p.relative_to(root).as_posix()


FRONT_MATTER = re.compile(r"\A---\n(.*?)\n---\n", re.S)


def split_front_matter(text):
    m = FRONT_MATTER.match(text)
    if not m:
        return {}, text
    fm = {}
    for line in m.group(1).splitlines():
        if ":" in line and not line.startswith(" "):
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return fm, text[m.end():]


def strip_code_blocks(body):
    return re.sub(r"```.*?```", "", body, flags=re.S)


def domain_of(rel_path):
    parts = rel_path.split("/")
    if len(parts) >= 3 and parts[0] == "model-reference":
        return parts[1]
    return ""


def page_type(set_name, rel_path):
    name = rel_path.rsplit("/", 1)[-1]
    stem = name.rsplit(".", 1)[0]
    if set_name == "udm":
        return "conceptual"
    if rel_path.startswith("model-reference/") and rel_path.count("/") >= 2:
        if stem == "readme":
            return "domain-readme"
        if stem == "overview":
            return "domain-overview"
        if stem == "model-diagrams":
            return "domain-diagrams"
        if stem.startswith("entities"):
            return "domain-entities"
        return "domain-other"
    if rel_path.startswith("whats-new/"):
        return "whats-new"
    return "ds-landing"


def doc_url(set_name, rel_path):
    """Best-effort published URL path (Docusaurus default slug rules)."""
    stem = re.sub(r"\.mdx?$", "", rel_path)
    if stem.endswith("readme") or stem.endswith("index"):
        stem = stem.rsplit("/", 1)[0] if "/" in stem else ""
    if set_name == "udm":
        # docs/reference/1-data-exchange/... -> /reference/data-exchange/...
        stem = re.sub(r"(^|/)\d+-", r"\1", stem)
        return "/reference/" + stem
    v = set_name[1:]
    base = f"/{DS_ROUTE}" if v == DS_LATEST else f"/{DS_ROUTE}/{v}"
    return base + ("/" + stem if stem else "")


def word_count(text):
    return len(re.findall(r"\b\w[\w'-]*\b", text))
