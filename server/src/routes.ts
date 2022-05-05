import { Router } from 'express';

import { version, name } from '../package.json';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = Router();

routes.post('/feedbacks', async (request, response) => {
  const prismaFeedbacksRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  );

  await submitFeedbackUseCase.perform(request.body);

  return response.status(201).send();
});

routes.get('/health', (request, response) => response.json({ name, version }));
