import express from 'express';
import { print } from '../utils/print.js';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(3000, () => {
	print('➡️  Server running on http://localhost:3000');
});
