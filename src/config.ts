import { workspace, window } from "vscode";
import got from "got";

export function serverUrl() {
    if (window.activeTextEditor?.document.languageId=="latex") {
        return workspace.getConfiguration('zoterosearch').get('serverUrlLatex', 'http://127.0.0.1:23119/better-bibtex/cayw?format=latex');

    } else {
        return workspace.getConfiguration('zoterosearch').get('serverUrlOther', 'http://127.0.0.1:23119/better-bibtex/cayw?format=pandoc');

    }

}

// Fetch a citation via a Zotero Cite as you Write popup
export async function cayw(): Promise<string> {

    const res = await got(`${serverUrl()}`);

    return res.body;
}