#!/usr/bin/env node

const json2xls = require('json2xls');
const clipboardy = require('clipboardy');
const fs = require('fs');
const fsp = fs.promises;
const { getOptions } = require('./options');
const { getFilePath, getJSON } = require('./utils');

main(getOptions());

async function main({ files, clipboard }) {
	if (clipboard) {
		await processClipboard(clipboard);
	} else {
		await processFiles(files);
	}
}

async function processClipboard(clipboard) {
	const text = await clipboardy.read();
	await createExcelFile(text, clipboard);
}

async function processFile(filePath) {
	try {
		const fileName = filePath.replace(/\.[^/.]+$/, '');

		const fileContents = await fsp.readFile(filePath);
		await createExcelFile(fileContents.toString(), fileName);
	} catch {
		console.error(`Could not process file. (${filePath})`);
	}
}

async function processFiles(files) {
	const tasks = [];
	for (file of files) {
		const filePath = getFilePath(file);
		if (fs.existsSync(filePath)) {
			tasks.push(processFile(filePath));
		} else {
			console.error(`File '${filePath}' does not exist.`);
		}
	}

	await Promise.all(tasks);
}

async function createExcelFile(contents, fileName) {
	try {
		const json = getJSON(contents);

		if (Object.keys(json).length > 0) {
			const xls = json2xls(json);
			await fsp.writeFile(`${fileName}.xlsx`, xls, 'binary');
		} else {
			console.warn(
				`${fileName}.xlsx was not generated because ${fileName}.json is empty.`
			);
		}
	} catch {
		console.error(`Failed to parse JSON (${fileName}).`);
	}
}
