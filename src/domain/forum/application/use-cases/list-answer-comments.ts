import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answers-repository";

interface ListAnswerCommentsUseCaseRequest {
  page: number;
  answerId: string;
}

interface ListAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class ListAnswerCommentsUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    page,
    answerId,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Not found");
    }

    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    console.log(answerComments, "answerComments");

    return {
      answerComments,
    };
  }
}
