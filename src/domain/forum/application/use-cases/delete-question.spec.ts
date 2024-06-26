import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question use case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("should be able to delete an question", async () => {
    const question = makeQuestion({});

    await inMemoryQuestionsRepository.save(question);

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });
  it("should not be able to delete a question from another user", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryQuestionsRepository.save(question);

    expect(async () => {
      await sut.execute({
        authorId: "author-2",
        questionId: question.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
