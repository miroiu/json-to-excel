const yargs = require('yargs');

const getOptions = () => {
	const options = yargs
		.scriptName('jx')
		.command(
			'$0 <file> [files..]',
			'Converts json files to excel files',
			args =>
				args
					.positional('file', {
						type: 'string',
						describe: 'JSON file to convert',
					})
					.positional('files', {
						type: 'string',
						describe: 'Other JSON files to convert',
					})
		)
		.command(
			['c [output]', 'clip [output]', 'clipboard [output]'],
			'Converts clipboard contents to excel file',
			args =>
				args
					.positional('output', {
						type: 'string',
						describe: 'Excel file name',
						default: 'clipboard',
					})
					.example('$0 c file', 'Output to file.xlsx')
					.example('$0 c -o file', 'Output to file.xlsx')
		)
		.example('$0 file.json', 'Creates file.xlsx from file.json contents')
		.example('$0 c output', 'Creates output.xlsx from clipboard contents')
		.example('$0 c', 'Creates clipboard.xlsx from clipboard contents')
		.strict().argv;

	const files = new Set();

	if (options.file) {
		files.add(options.file);
	}

	if (options.files) {
		for (file of options.files) {
			files.add(file);
		}
	}

	return { files: Array.from(files), clipboard: options.output };
};

exports.getOptions = getOptions;
