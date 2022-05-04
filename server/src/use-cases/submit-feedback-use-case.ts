import type { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  private readonly feedbacksRepository: FeedbacksRepository;

  constructor(feedbacksRepository: FeedbacksRepository) {
    this.feedbacksRepository = feedbacksRepository;
  }

  async perform(request: SubmitFeedbackRequest): Promise<void> {
    await this.feedbacksRepository.create(request);
  }
}
