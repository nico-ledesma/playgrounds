import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { print } from '../utils/print.js';

const ajv = new Ajv({
	$data: true,
	allowUnionTypes: true,
	allErrors: true,
});
addFormats(ajv);

const validate = (payload, schema) => {
	try {
		const validator = ajv.compile(schema);
		const results = validator(payload);

		if (results) {
			print(`✅ Validation OK`);
		} else {
			const issues = ajv.errorsText(validator.errors).split(', ');
			print(`❌ Validation failed\n`, issues);
		}
	} catch (error) {
		print(`⚠️ Unexpected error\n`, error);
	}
};

const schema = {
	type: 'object',
	additionalProperties: false,
	required: ['firstName', 'lastName', 'age'],
	properties: {
		firstName: {
			type: 'string',
			minLength: 1,
			maxLength: 50,
		},
		lastName: {
			type: 'string',
			minLength: 1,
			maxLength: 50,
		},
		age: {
			type: 'integer',
			minimum: 1,
		},
	},
};

const payload = {
	firstName: 'Nico',
	age: '37',
};

validate(payload, schema);
