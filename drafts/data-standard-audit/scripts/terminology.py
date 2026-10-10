"""Phase 0: terminology pre-pass over v5, v6, and UDM pages.

Output: working/terminology-hits.csv — one row per "Ed-Fi" occurrence with a
rule tag. Regex candidates only; Phase 2a-T classifies them in context.
"""

import csv
import re

from common import WORKING, REPO, iter_pages, split_front_matter

ACCEPTED = [
    "Alliance Summit", "Alliance Tech Congress", "Alliance",
    "Data Standard", "Technology Suite", "ODS/API", "API Specification", "API",
    "ODS", "Community", "Certifications and Badges", "Certification",
    "Certified Partner", "Badge", "Badged Partner", "Technology Partners",
    "Premier Partner",
    # Audit ruling: UDM accepted.
    "Unifying Data Model", "UDM",
]
AVOID = [
    ("technology", r"technology(?! suite)"), ("credentials", r"credentials?"),
    ("Badges and Certifications", r"badges and certifications"),
    ("Partner", r"partners?(?! program)"), ("standards", r"standards?\b"),
    ("Summit", r"summit"), ("Tech Congress", r"tech congress"),
]
VERB_MISUSE = re.compile(
    r"\b(deploy(?:s|ed|ing)?|adopt(?:s|ed|ing)?)\s+(?:the\s+)?(?:Ed-Fi\s+)?data\s+standard",
    re.I)

TOKEN = re.compile(r"Ed-Fi(?![-\w])")
IDENTIFIER = re.compile(r"Ed-Fi-[A-Za-z]|[\w/.-]Ed-Fi|Ed-Fi[\w.]*\.(?:md|png|svg|zip)")
SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+")


def classify(after):
    for phrase in ACCEPTED:
        if after.startswith(phrase):
            return "accepted", phrase
    lower = after.lower()
    for label, pattern in AVOID:
        if re.match(pattern, lower):
            return "avoid", label
    if not after or not after[0].isalpha():
        return "bare", ""
    return "unlisted", " ".join(after.split()[:2])


def main():
    WORKING.mkdir(parents=True, exist_ok=True)
    rows = []
    for set_name, path, rel in iter_pages(("5", "6", "udm")):
        _, body = split_front_matter(path.read_text(encoding="utf-8"))
        in_code, seen_full = False, False
        for lineno, line in enumerate(body.splitlines(), 1):
            if line.strip().startswith("```"):
                in_code = not in_code
                continue
            if in_code:
                continue
            # Ignore URLs and link targets.
            scan = re.sub(r"\]\([^)]*\)|https?://\S+|`[^`]*`", lambda m: " " * len(m.group(0)), line)
            for m in TOKEN.finditer(scan):
                start = m.start()
                if IDENTIFIER.match(scan, max(0, start - 1)) and start > 0 and scan[start - 1] not in " (*_[\"'":
                    continue
                after = scan[m.end():].lstrip()
                rule, phrase = classify(after)
                if rule == "accepted":
                    first_full = not seen_full
                    seen_full = True
                else:
                    first_full = ""
                sentence = next((s for s in SENTENCE_SPLIT.split(line) if "Ed-Fi" in s), line)
                rows.append({
                    "set": set_name, "path": path.relative_to(REPO).as_posix(),
                    "line": lineno, "rule": rule, "phrase": phrase,
                    "following": " ".join(after.split()[:4]),
                    "first_accepted_on_page": first_full,
                    "context": sentence.strip()[:300],
                })
            for m in VERB_MISUSE.finditer(scan):
                rows.append({
                    "set": set_name, "path": path.relative_to(REPO).as_posix(),
                    "line": lineno, "rule": "verb", "phrase": m.group(1),
                    "following": m.group(0), "first_accepted_on_page": "",
                    "context": line.strip()[:300],
                })

    with open(WORKING / "terminology-hits.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    from collections import Counter
    print(Counter(r["rule"] for r in rows))


if __name__ == "__main__":
    main()
