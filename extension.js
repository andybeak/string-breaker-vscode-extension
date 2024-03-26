// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "string-breaker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('string-breaker.breakString', function () {
		const editor = vscode.window.activeTextEditor;
        const maxLength = 62;
        if (editor) {
            const document = editor.document;
            editor.edit(editBuilder => {
                editor.selections.forEach(sel => {
                    const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                    const longString = document.getText(range);
                    const individualWords = longString.split(' ');
                    console.log("individual words");
                    console.log(individualWords);
                    let lines = [];
                    let line = '';
                    for (let i = 0; i < individualWords.length; i++) {
                        const thisWord = individualWords[i];
                        if (line.length + thisWord.length <= maxLength) {
                            line += thisWord + ' ';
                        } else {
                            lines.push(line);
                            line = thisWord + ' ';
                        }
                    }
                    let replacement = '';
                    for (let i = 0; i < lines.length; i++) {
                        replacement += '"' + lines[i] + '" +\n';
                    }
                    editBuilder.replace(range, replacement);
                })
            }) // apply the (accumulated) replacement(s) (if multiple cursors/selections)
        }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
