import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answercommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment = await this.answercommentsRepository.findById(
      answerCommentId
    );

    if (!answercomment) {
      throw new Error("Not found");
    }

    if (answercomment.authorId.toString() !== authorId) {
      throw new Error("Access denied");
    }

    await this.answercommentsRepository.delete(answercomment);

    return {};
  }
}
