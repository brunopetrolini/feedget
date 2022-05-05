/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
import { SubmitFeedbackUseCase } from './submit-feedback-use-case';
import { FeedbackCreateData, FeedbacksRepository } from '../repositories/feedbacks-repository';
import { MailAdapter, SendMailData } from '../adapters/mail-adapter';

class FeedbackRepositoryMock implements FeedbacksRepository {
  async create(feedback: FeedbackCreateData): Promise<void> {}
}

class MailAdapterMock implements MailAdapter {
  async sendMail(data: SendMailData): Promise<void> {}
}

const makeSut = (): SubmitFeedbackUseCase => {
  const feedbacksRepository = new FeedbackRepositoryMock();
  const mailAdapter = new MailAdapterMock();
  return new SubmitFeedbackUseCase(feedbacksRepository, mailAdapter);
};

describe('Submit Feedback Use Case', () => {
  it('Should be able to submit a feedback', async () => {
    const sut = makeSut();

    const promise = sut.perform({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png:base64,test.jpg',
    });

    await expect(promise).resolves.not.toThrow();
  });

  it('Should not be able submit feedback without type', async () => {
    const sut = makeSut();

    const promise = sut.perform({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png:base64,test.jpg',
    });

    await expect(promise).rejects.toThrow();
  });

  it('Should not be able submit feedback without comment', async () => {
    const sut = makeSut();

    const promise = sut.perform({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png:base64,test.jpg',
    });

    await expect(promise).rejects.toThrow();
  });
});
