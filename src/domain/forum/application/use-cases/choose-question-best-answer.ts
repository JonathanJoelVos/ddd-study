import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerRequest {
  authorId: string;
  answerId: string;
}
interface ChooseQuestionBestAnswerResponse {
  question: Question;
}

export class ChooseQuestionBestAnswer {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Not found answer");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toValue()
    );

    if (!question) {
      throw new Error("Not found answer");
    }

    console.log(question.authorId.toString(), authorId);

    if (question.authorId.toString() != authorId) {
      throw new Error("Not allowed");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return {
      question,
    };
  }
}
