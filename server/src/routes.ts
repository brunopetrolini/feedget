import { Router } from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

import { version, name } from '../package.json';

export const routes = Router();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7861e553e56170',
    pass: 'f1ad6b5fb3b842',
  },
});

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const feedback = await prisma.feedback.create({
    data: { type, comment, screenshot },
  });

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Bruno Petrolini <brunopetrolini@hotmail.com>',
    subject: 'Novo Feedback',
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      '</div>',
    ].join('\n'),
  });

  return response.status(201).json({ data: feedback });
});

routes.get('/health', (request, response) => response.json({ name, version }));
