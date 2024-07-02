import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question use case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("should be able to edit an question", async () => {
    const question = makeQuestion({});

    await inMemoryQuestionsRepository.save(question);

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: "new content",
      title: "new title",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: "new content",
      title: "new title",
    });
  });
  it("should not be able to edit a question from another user", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryQuestionsRepository.save(question);

    const result = await sut.execute({
      authorId: "author-2",
      content: "content",
      questionId: question.id.toString(),
      title: "title",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
