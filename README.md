# Convert JSON to XLSX

## Quick start:

```cmd
npm install -g @miroiu/json-to-excel
```

Create a test.json file:

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
jx test.json
```

You should see a test.xlsx file near the test.json file.

### Show helpful information

```cmd
jx --help
jx c --help
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
