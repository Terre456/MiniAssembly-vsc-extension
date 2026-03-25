// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "miniassembly-theme" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('miniassembly-theme.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from MiniAssembly+Theme!');
	});

	context.subscriptions.push(disposable);

	// color management and theme overriding
	const customColors = {
        "textMateRules": [
            {
                "scope": "function.miniassembly",
                "settings": { "foreground": "#DCDCAA" }
            },
            {
                "scope": "keyword.control.miniassembly",
                "settings": { "foreground": "#569cd6"}
            },
			{
				"scope":"comment.line.double-slash.miniassembly",
				"settings": { "foreground": "#6A9955", "fontStyle": "italic" }
			},
			{
				"scope": "variable.label.miniassembly",
				"settings": { "foreground": "#9CDCFE", "fontStyle": "italic" }
			},
			{
				"scope": "keyword.control.flow.miniassembly",
				"settings": { "foreground": "#867cb8" } // modifiable pasque couleur pas ouf
			},
			{
				"scope": "constant.register.miniassembly",
				"settings": { "foreground": "#4FC1FF" }
			},
			{
				"scope": "constant.register.special.miniassembly",
				"settings": { "foreground": "#c3314c" }
			},
        ]
    };

    vscode.workspace.getConfiguration().update(
        "editor.tokenColorCustomizations",
        customColors,
        vscode.ConfigurationTarget.Global
    );

	// autocompletion items
	const provider = vscode.languages.registerCompletionItemProvider(
        'monLangage', // ID de ton langage
        {
            provideCompletionItems(document, position, token, context) {

                const completions: vscode.CompletionItem[] = [];

                const item = new vscode.CompletionItem('print', vscode.CompletionItemKind.Function);
                item.detail = 'Fonction print';
                item.insertText = new vscode.SnippetString('print(${1:arg})');

                completions.push(item);

                return completions;
            }
        },
	)
}

// This method is called when your extension is deactivated
export function deactivate() {}
