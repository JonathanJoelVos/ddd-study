import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ListRecentsQuestionsUseCaseRequest {
  page: number;
}

interface ListRecentsQuestionsUseCaseResponse {
  questions: Question[];
}

export class ListRecentsQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentsQuestionsUseCaseRequest): Promise<ListRecentsQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecents({
      page,
    });

    return {
      questions,
    };
  }
}
