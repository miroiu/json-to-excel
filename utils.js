var path = require('path');

const getFilePath = name => {
	const ext = path.extname(name);

	if (ext) {
		return name;
	}

	return `${name}.json`;
};

function getJSON(string) {
	const json = JSON.parse(string);
	const result = transformJSON(json);
	if (result && result !== Object(result)) {
		return { Value: result };
	}
	return result;
}

function transformJSON(json) {
	if (Array.isArray(json)) {
		return json;
	}

	if (json && typeof json === 'object') {
		const keys = Object.keys(json);

		if (keys.length === 1) {
			const value = json[keys[0]];
			const nestedJSON = transformJSON(value);

			if (nestedJSON && nestedJSON === Object(nestedJSON)) {
				return nestedJSON;
			}

			return json;
		}
	}
	return json;
}

exports.getFilePath = getFilePath;
exports.getJSON = getJSON;
