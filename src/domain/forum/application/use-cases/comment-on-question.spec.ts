import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Create Question use case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });
  it("should be able to create an question comment", async () => {
    const question = makeQuestion({}, new UniqueEntityID("question-1"));
    await inMemoryQuestionsRepository.save(question);

    const { questionComment } = await sut.execute({
      content: "teste",
      authorId: "test-id",
      questionId: "question-1",
    });

    expect(questionComment.id).toBeTruthy();
    expect(inMemoryQuestionCommentsRepository.items[0].id).toEqual(
      questionComment.id
    );
  });
});
