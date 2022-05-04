import express from 'express';

import { version } from '../package.json';

const app = express();

app.get('/health', (request, response) => response.json({ version }));

app.listen(4000, () => console.log('HTTP server running'));
