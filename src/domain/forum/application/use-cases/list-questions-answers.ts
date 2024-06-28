import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ListQuestionsAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface ListQuestionsAnswersUseCaseResponse {
  answers: Answer[];
}

export class ListQuestionsAnswersUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository
  ) {}

  async execute({
    page,
    questionId,
  }: ListQuestionsAnswersUseCaseRequest): Promise<ListQuestionsAnswersUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Not found");
    }

    const answers = await this.answersRepository.findManyByQuestionId(
      question.id.toString(),
      {
        page,
      }
    );

    return {
      answers,
    };
  }
}
