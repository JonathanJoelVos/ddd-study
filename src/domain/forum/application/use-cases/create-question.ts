import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

interface CreateQuestionUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    content,
    authorId,
    title,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    });

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = questionAttachments;

    this.questionsRepository.save(question);

    return right({
      question,
    });
  }
}
