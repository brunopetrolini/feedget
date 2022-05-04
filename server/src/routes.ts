import { Router } from 'express';
import nodemailer from 'nodemailer';

import { version, name } from '../package.json';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';

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
  const prismaFeedbacksRepository = new PrismaFeedbackRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository);

  await submitFeedbackUseCase.perform(request.body);

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Bruno Petrolini <brunopetrolini@hotmail.com>',
    subject: 'Novo Feedback',
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do feedback: ${request.body.type}</p>`,
      `<p>Comentário: ${request.body.comment}</p>`,
      '</div>',
    ].join('\n'),
  });

  return response.status(201).send();
});

routes.get('/health', (request, response) => response.json({ name, version }));
