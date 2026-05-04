import { z, ZodError } from 'zod';
import { print } from '../utils/print.js';

const validate = (payload, schema) => {
	try {
		const result = schema.parse(payload);
		print(`✅ Validation OK \n`, result);
	} catch (error) {
		if (error instanceof ZodError) {
			const issues = JSON.stringify(error.issues, null, 2);
			print(`❌ Validation failed \n`, issues);
		} else {
			print(`⚠️ Unexpected error\n`, error);
		}
	}
};

const schema = z.object({
	name: z.string(),
	age: z.number(),
});

const payload = {
	age: '37',
};

validate(payload, schema);
