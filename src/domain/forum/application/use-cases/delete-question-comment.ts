import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
  authorId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questioncommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment = await this.questioncommentsRepository.findById(
      questionCommentId
    );

    if (!questioncomment) {
      throw new Error("Not found");
    }

    if (questioncomment.authorId.toString() !== authorId) {
      throw new Error("Access denied");
    }

    await this.questioncommentsRepository.delete(questioncomment);

    return {};
  }
}
