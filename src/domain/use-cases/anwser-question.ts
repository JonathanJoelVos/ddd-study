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
      authorId: instructorId,
      questionId,
      content,
    });
    this.anwsersRepository.save(anwser);
    return anwser;
  }
}
