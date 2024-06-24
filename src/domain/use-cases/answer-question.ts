import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Answer } from "../entities /answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  content: string;
  questionId: string;
  instructorId: string;
}

interface AnswerQuestionUseCaseResponse {}

export class AnswerQuestionUseCase {
  constructor(private anwsersRepository: AnswerRepository) {}

  async execute({
    content,
    instructorId,
    questionId,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.anwsersRepository.save(answer);
    return answer;
  }
}
