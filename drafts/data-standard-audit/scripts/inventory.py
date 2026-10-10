"""Phase 0: source inventory, cross-version diff, and table-row duplication.

Outputs (in working/):
    inventory.csv        one row per in-scope page (source metrics)
    version-diff.csv     similarity of each v6 logical page vs. v3/v4/v5
    table-dupes.csv      entity/descriptor rows repeated across domains (v5, v6)
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))

import csv
import difflib
import re
from collections import defaultdict

from common import (WORKING, DS_VERSIONS, DS_ROOT, iter_pages, split_front_matter,
                    strip_code_blocks, domain_of, page_type, doc_url, word_count)

HEADING = re.compile(r"^(#{1,6})\s+(.*)$", re.M)
LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")


def tables(body):
    """Return list of (section_heading, header_cells, rows) for pipe tables."""
    out, section, lines = [], "", body.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        h = HEADING.match(line)
        if h:
            section = h.group(2).strip()
        if line.startswith("|") and i + 1 < len(lines) and re.match(r"^\|\s*:?-{3,}", lines[i + 1]):
            header = [c.strip() for c in line.strip().strip("|").split("|")]
            rows = []
            i += 2
            while i < len(lines) and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            out.append((section, header, rows))
            continue
        i += 1
    return out


def main():
    WORKING.mkdir(parents=True, exist_ok=True)
    inv_rows, normalized = [], {}
    dupes = defaultdict(lambda: defaultdict(set))  # (set, kind, name) -> {domain}

    for set_name, path, rel in iter_pages():
        text = path.read_text(encoding="utf-8")
        fm, body = split_front_matter(text)
        prose = strip_code_blocks(body)
        heads = HEADING.findall(prose)
        h1 = next((t for lvl, t in heads if lvl == "#"), fm.get("title", ""))
        tbls = tables(prose)
        cells = [c for _, _, rows in tbls for r in rows for c in r]
        empty = sum(1 for c in cells if not c)
        links = LINK.findall(prose)
        domain = domain_of(rel)

        inv_rows.append({
            "set": set_name,
            "rel_path": rel,
            "repo_path": path.relative_to(DS_ROOT.parent).as_posix(),
            "url": doc_url(set_name, rel),
            "domain": domain,
            "page_type": page_type(set_name, rel),
            "words": word_count(prose),
            "h1": h1,
            "title_fm": fm.get("title", ""),
            "has_description": "description" in fm,
            "front_matter_keys": ";".join(fm.keys()),
            "headings": " | ".join(f"{lvl} {t}" for lvl, t in heads),
            "heading_count": len(heads),
            "h1_count": sum(1 for lvl, _ in heads if lvl == "#"),
            "tables": len(tbls),
            "table_rows": sum(len(r) for _, _, r in tbls),
            "empty_cell_ratio": round(empty / len(cells), 3) if cells else "",
            "links": len(links),
            "external_links": sum(1 for l in links if l.startswith("http")),
            "mermaid_embeds": prose.count("<Mermaid"),
            "images": len(re.findall(r"!\[|<img", prose)),
        })

        if set_name.startswith("v"):
            norm = re.sub(r"\s+", " ", prose).strip()
            normalized[(set_name[1:], rel)] = norm
            if page_type(set_name, rel) == "domain-entities":
                for section, header, rows in tbls:
                    kind = ("descriptor" if "Descriptor" in section else
                            "extended-reference" if "Reference" in section else
                            "entity" if "Entit" in section else section)
                    for r in rows:
                        if r and r[0]:
                            dupes[(set_name, kind, r[0])]["domains"].add(domain)

    with open(WORKING / "inventory.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(inv_rows[0].keys()))
        w.writeheader()
        w.writerows(inv_rows)

    # Cross-version similarity keyed on the v6 logical page; also list pages
    # that exist only in older versions.
    all_rels = {rel for (_, rel) in normalized}
    with open(WORKING / "version-diff.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["rel_path", "present_in"] + [f"sim_v6_v{v}" for v in DS_VERSIONS if v != "6"])
        for rel in sorted(all_rels):
            present = [v for v in DS_VERSIONS if (v, rel) in normalized]
            sims = []
            for v in DS_VERSIONS:
                if v == "6":
                    continue
                a, b = normalized.get(("6", rel)), normalized.get((v, rel))
                if a is None or b is None:
                    sims.append("")
                else:
                    sm = difflib.SequenceMatcher(None, a.split(" "), b.split(" "), autojunk=False)
                    sims.append(round(sm.ratio(), 3))
            w.writerow([rel, ";".join(present)] + sims)

    with open(WORKING / "table-dupes.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["set", "kind", "name", "domain_count", "domains"])
        for (s, kind, name), d in sorted(dupes.items(), key=lambda kv: -len(kv[1]["domains"])):
            if s in ("v5", "v6"):
                w.writerow([s, kind, name, len(d["domains"]), ";".join(sorted(d["domains"]))])

    print(f"inventory: {len(inv_rows)} pages; version-diff: {len(all_rels)} logical pages")


if __name__ == "__main__":
    main()
