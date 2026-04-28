import { select } from '@inquirer/prompts';
import { spawn } from 'node:child_process';
import path from 'node:path';

/**
 * Map of playground names to their corresponding entry files
 */
const PLAYGROUNDS = {
	'Day.js': './playgrounds/dayjs.js',
	'Express': './playgrounds/express.js',
	'JSON Schema': './playgrounds/json-schema.js',
	'Lodash': './playgrounds/lodash.js',
	'Zod 3': './playgrounds/zod-3.js',
};

/**
 * Prompts the user to select a playground
 * @returns {Promise<{title: string, file: string}>}
 */
async function selectPlayground() {
	const selectedFileName = await select({
		message: 'Choose a playground:',
		choices: Object.entries(PLAYGROUNDS).map(([name, file]) => ({
			name,
			value: file,
		})),
	});

	const title = Object.entries(PLAYGROUNDS).find(([, filename]) => filename === selectedFileName)?.[0];

	return { title, file: selectedFileName };
}

/**
 * Runs the selected playground file using nodemon for hot-reloading
 * @param {string} file - The path to the playground file to run
 */
function runPlayground(file) {
	const nodemonBin = path.resolve('node_modules', '.bin', process.platform === 'win32' ? 'nodemon.cmd' : 'nodemon');
	const child = spawn(nodemonBin, ['--quiet', '--watch', file, file], {
		stdio: 'inherit',
	});

	child.on('exit', (code) => {
		process.exit(code ?? 0);
	});
}

/**
 * Main function to run the playground selector and runner
 */
async function main() {
	try {
		const { title, file } = await selectPlayground();

		console.clear();
		console.log(`================================================================`);
		console.log(`🚀 ${title} Playground`);
		console.log(`================================================================\n\n`);

		runPlayground(file);
	} catch (error) {
		if (error?.name === 'ExitPromptError') {
			process.exit(0);
		}

		throw error;
	}
}

main();
