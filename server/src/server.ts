import express from 'express';
import { prisma } from './prisma';

import { version, name } from '../package.json';

const app = express();
app.use(express.json());

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const feedback = await prisma.feedback.create({
    data: { type, comment, screenshot },
  });

  return response.status(201).json({ data: feedback });
});

app.get('/health', (request, response) => response.json({ name, version }));

app.listen(4000, () => console.log('HTTP server running'));
