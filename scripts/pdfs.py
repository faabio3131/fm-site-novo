#!/usr/bin/env python3
"""Gera os PDFs de assets/materiais a partir do HTML de src/materiais-pdf.mjs.
Uso (na raiz do repositório): python3 scripts/pdfs.py
Requer Node e Playwright com Chromium. Os PDFs gerados são versionados."""
import pathlib, subprocess, tempfile
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parent.parent
out = root / "assets" / "materiais"
out.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory() as tmp:
    subprocess.run(["node", "src/materiais-pdf.mjs", tmp], cwd=root, check=True)
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--allow-file-access-from-files"])
        for html in sorted(pathlib.Path(tmp).glob("*.html")):
            pg = b.new_page()
            pg.goto(html.as_uri())
            pg.pdf(path=str(out / (html.stem + ".pdf")), format="A4", print_background=True, prefer_css_page_size=True)
            pg.close()
        b.close()
print("ok")
