import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Anwser } from "../entities /answer";
import { AnwsersRepository } from "../repositories/anwsers-repository";

interface AnwserQuestionUseCaseRequest {
  content: string;
  questionId: string;
  instructorId: string;
}

interface AnwserQuestionUseCaseResponse {}

export class AnwserQuestionUseCase {
  constructor(private anwsersRepository: AnwsersRepository) {}

  async execute({
    content,
    instructorId,
    questionId,
  }: AnwserQuestionUseCaseRequest) {
    const anwser = new Anwser({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });
    this.anwsersRepository.save(anwser);
    return anwser;
  }
}
