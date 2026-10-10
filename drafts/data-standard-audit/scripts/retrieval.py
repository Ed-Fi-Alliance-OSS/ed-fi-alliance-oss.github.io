"""Phase 0/2f: BM25 retrieval simulator over the built site.

A directional stand-in for Perplexity's site-restricted search: one document
per page, title boosted. Not a model of Perplexity's ranking.

Usage:
    python3 retrieval.py                     # run all questions in questions.yaml
    python3 retrieval.py "what is a descriptor"   # ad-hoc query

Writes working/retrieval-results.csv when run over questions.yaml.
"""

import csv
import json
import math
import re
import sys
from collections import Counter

import yaml

from common import WORKING, AUDIT, DS_ROUTE

K1, B, TITLE_BOOST, TOP_K = 1.2, 0.75, 3, 10
STOP = set("""a an and are as at be by can do does for from how i in is it of on or
should the this to what when where which who why with you your""".split())


def tokens(text):
    return [t for t in re.findall(r"[a-z0-9]+", text.lower()) if t not in STOP]


class Index:
    def __init__(self, docs):
        self.docs = docs
        self.tf = []
        df = Counter()
        for d in docs:
            toks = tokens(d["text"]) + tokens(d["title"]) * TITLE_BOOST
            c = Counter(toks)
            self.tf.append((c, len(toks)))
            df.update(c.keys())
        self.n = len(docs)
        self.avgdl = sum(l for _, l in self.tf) / self.n
        self.idf = {t: math.log(1 + (self.n - f + 0.5) / (f + 0.5)) for t, f in df.items()}

    def search(self, query, k=TOP_K):
        q = tokens(query)
        scores = []
        for i, (c, dl) in enumerate(self.tf):
            s = 0.0
            for t in q:
                f = c.get(t)
                if f:
                    s += self.idf[t] * f * (K1 + 1) / (f + K1 * (1 - B + B * dl / self.avgdl))
            if s:
                scores.append((s, i))
        scores.sort(reverse=True)
        return [(round(s, 2), self.docs[i]) for s, i in scores[:k]]


def ds_version(url):
    m = re.match(rf"/{DS_ROUTE}(?:/(\d))?(?:/|$)", url)
    if not m:
        return ""
    return m.group(1) or "6"


def norm(url):
    return url.rstrip("/") or "/"


def main():
    docs = [json.loads(l) for l in open(WORKING / "corpus.jsonl", encoding="utf-8")]
    idx = Index(docs)

    if len(sys.argv) > 1:
        for s, d in idx.search(" ".join(sys.argv[1:])):
            print(f"{s:7.2f}  v{ds_version(d['url']) or '-'}  {d['url']}")
        return

    questions = yaml.safe_load(open(AUDIT / "questions.yaml", encoding="utf-8"))["questions"]
    with open(WORKING / "retrieval-results.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["id", "question", "expected", "expected_rank", "top1_url", "top1_version",
                    "older_version_in_top3", "top3"])
        hits1 = hits3 = 0
        for q in questions:
            res = idx.search(q["question"])
            urls = [norm(d["url"]) for _, d in res]
            expected = [norm(e) for e in q.get("expected_urls", [])]
            rank = next((i + 1 for i, u in enumerate(urls) if u in expected), "")
            hits1 += rank == 1
            hits3 += bool(rank) and rank <= 3
            older = any(ds_version(u) in ("3", "4", "5") for u in urls[:3])
            w.writerow([q["id"], q["question"], ";".join(expected), rank,
                        urls[0] if urls else "", ds_version(urls[0]) if urls else "",
                        older, " ; ".join(urls[:3])])
    n = len(questions)
    print(f"{n} questions: hit@1={hits1/n:.0%} hit@3={hits3/n:.0%}")


if __name__ == "__main__":
    main()
