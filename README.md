# Zotero Backward Searcher

## Features
This is a VS Code extension for inserting citations from Zotero and for open a citation in Zotero from VS Code.

Thanks to: [Zotero Latex](https://github.com/bnavetta/vscode-zotero-latex/)

## Requirement
[Zotero](https://www.zotero.org/) with [Better BibTex for Zotero](https://github.com/retorquere/zotero-better-bibtex) installed. For configurations and usage of Better BibTex for Zotero, check [here](https://retorque.re/zotero-better-bibtex/).

## How to Use
- insert citation: from Command Palette use the command `Zotero Back: Add Citation from Zotero`, a Zotero Picker will appear (probably minimised in the background), type words and select a citation 
- open citation in Zotero: when cursor is on the citation key in VS Code editor,  from Command Palette use the command `Zotero Back: Open in Zotero`

## Known Issues

This extension is at very primitive version and has many issues/inconviniences. Mayjor ones are:
- LaTeX citation only supports `\cite{key}` format by default, but you can and have to edit the server url in settings to get other LaTeX citation formats, e.g., `\autocite{key}`
- For other file types, citation format defaults to `pandoc`, e.g., `@authorYear`, but you can also edit the server url to get other formats.

**Contributions are welcome!**

## Release Notes

### 0.0.1

Initial release. Primitive support of adding citations and backward search in Zotero.

