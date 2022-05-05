import type { MailAdapter } from '../adapters/mail-adapter';
import type { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  private readonly feedbacksRepository: FeedbacksRepository;
  private readonly mailAdapter: MailAdapter;

  constructor(feedbacksRepository: FeedbacksRepository, mailAdapter: MailAdapter) {
    this.feedbacksRepository = feedbacksRepository;
    this.mailAdapter = mailAdapter;
  }

  async perform(request: SubmitFeedbackRequest): Promise<void> {
    const emailBody = [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do feedback: ${request.type}</p>`,
      `<p>Comentário: ${request.comment}</p>`,
      '</div>',
    ].join('\n');

    await Promise.all([
      this.feedbacksRepository.create(request),
      this.mailAdapter.sendMail({ subject: 'Novo feedback', body: emailBody }),
    ]);
  }
}
