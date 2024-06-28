import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseRequest {
  content: string;
  authorId: string;
  answerId: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    content,
    authorId,
    answerId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Not found");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    answer.content = content;

    await this.answersRepository.update(answer);
    return {
      answer,
    };
  }
}
