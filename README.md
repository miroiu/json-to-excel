# Convert JSON to XLSX

## Quick start:

```cmd
npm install
```

Create a test.json file inside the folder with the package.json:

```js
[
	{
		Id: 0,
		Name: 'Test 1',
	},
	{
		Id: 1,
		Name: 'Test 2',
	},
];
```

Run:

```cmd
npm start test.json
```

You should see a test.xlsx file near the test.json file.

### Show helpful information

```cmd
node . --help
```

## Using the CLI

Inside the folder with the package.json run the following command:

```cmd
npm install -g .
```

or run the next command

```cmd
npm install -g @miroiu/jx
```

### Working with files

Create a bunch of json files and run the following command:

```cmd
jx file1 file2 file3
```

### Working with the clipboard

```cmd
jx c outputFileName
```
