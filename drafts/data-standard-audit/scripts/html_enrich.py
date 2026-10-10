"""Phase 0: enrich the inventory with what the published (built) HTML exposes.

Requires `npm run build` first. Reads working/inventory.csv and writes
working/inventory-html.csv with extra columns, and builds the search corpus
used by retrieval.py (working/corpus.jsonl, whole site).
"""

import csv
import json
import re

from bs4 import BeautifulSoup

from common import WORKING, BUILD


def html_path(url):
    p = BUILD / url.lstrip("/") / "index.html"
    if p.exists():
        return p
    alt = BUILD / (url.lstrip("/") + ".html")
    return alt if alt.exists() else None


def parse(path):
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    title = soup.title.get_text(strip=True) if soup.title else ""
    desc = soup.find("meta", attrs={"name": "description"})
    canon = soup.find("link", attrs={"rel": "canonical"})
    robots = soup.find("meta", attrs={"name": "robots"})
    article = soup.find("article") or soup.find("main") or soup.body
    mermaid_containers = len(article.select(".docusaurus-mermaid-container, [class*='mermaid']")) if article else 0
    for tag in (article.select("nav, script, style, button") if article else []):
        tag.decompose()
    text = article.get_text(" ", strip=True) if article else ""
    return {
        "html_title": title,
        "meta_description": desc["content"] if desc and desc.has_attr("content") else "",
        "canonical": canon["href"] if canon and canon.has_attr("href") else "",
        "robots": robots["content"] if robots and robots.has_attr("content") else "",
        "visible_words": len(text.split()),
        "mermaid_containers": mermaid_containers,
        "visible_has_graph_source": bool(re.search(r"\bclassDiagram\b|\berDiagram\b|\bflowchart\b", text)),
    }, title, text


def main():
    rows = list(csv.DictReader(open(WORKING / "inventory.csv", encoding="utf-8")))
    missing = 0
    for r in rows:
        p = html_path(r["url"])
        if not p:
            missing += 1
            r.update({"html_found": False})
            continue
        info, _, _ = parse(p)
        r.update({"html_found": True, **info})
    fields = list(dict.fromkeys(k for r in rows for k in r.keys()))
    with open(WORKING / "inventory-html.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)
    print(f"enriched {len(rows) - missing}/{len(rows)} pages; {missing} without built HTML")

    # Whole-site corpus: Perplexity's domain filter sees every page, so the
    # data standard pages compete with ODS/API, blog, and partner pages.
    n = 0
    with open(WORKING / "corpus.jsonl", "w", encoding="utf-8") as out:
        for p in sorted(BUILD.rglob("index.html")):
            rel = "/" + p.parent.relative_to(BUILD).as_posix()
            if rel.startswith(("/search", "/assets", "/404")):
                continue
            _, title, text = parse(p)
            if len(text.split()) < 20:
                continue
            out.write(json.dumps({"url": rel if rel != "/." else "/", "title": title, "text": text}) + "\n")
            n += 1
    print(f"corpus: {n} pages")


if __name__ == "__main__":
    main()
