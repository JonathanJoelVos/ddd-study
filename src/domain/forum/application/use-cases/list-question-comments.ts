import { Answer } from "../../enterprise/entities/answer";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ListQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

interface ListQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class ListQuestionCommentsUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute({
    page,
    questionId,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Not found");
    }

    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    console.log(questionComments, "questionComments");

    return {
      questionComments,
    };
  }
}
