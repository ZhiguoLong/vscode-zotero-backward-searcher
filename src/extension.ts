// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { cayw } from './config';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "zoterobackwardsearcher" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('zoterobackwardsearcher.openInZotero', openInZotero);
	context.subscriptions.push(disposable);
	disposable = vscode.commands.registerCommand('zoterobackwardsearcher.addCitation', addCitation);
	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}

function extractCiteKey(editor: vscode.TextEditor): string {
    if (editor.selection.isEmpty) {
        const range = editor.document.getWordRangeAtPosition(editor.selection.active,/[^`~!@#\%\^\&*()\=+\[{\]}\|\;\:\'\"\,\.\<>\/\?\s]+|(-?\d.\d\w)/g);
        return editor.document.getText(range);
    } else {
        return editor.document.getText(new vscode.Range(editor.selection.start, editor.selection.end));
    }
}

export async function openInZotero() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const citeKey = extractCiteKey(editor);
    console.log(`Opening ${citeKey} in Zotero`);

    const uri = vscode.Uri.parse(`zotero://select/items/bbt:${citeKey}`);
    await vscode.env.openExternal(uri);
}

export async function addCitation() {
    console.log('Showing CAYW picker');

    try {
        const citation = await cayw();

        console.log(`Inserting citation ${citation}`);
        await insertAtCursor(citation);
    } catch (error) {
        debugger;
        console.log(error.code);
        if (error.code === 'ECONNREFUSED') {
            await vscode.window.showErrorMessage('Could not connect to Zotero. Is it running?');
        } else {
            await vscode.window.showErrorMessage(`Error adding citation: ${error}`);
        }
    }
}

function insertAtCursor(text: string): Thenable<Boolean> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        console.warn('No active text editor');
        return Promise.resolve(false);
    }

    return editor.edit(edit => {
        if (editor.selection.isEmpty) {
            edit.insert(editor.selection.active, text);
        } else {
            edit.delete(editor.selection);
            edit.insert(editor.selection.start, text);
        }
    });
}