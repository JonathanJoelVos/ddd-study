import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question use case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("should be able to create an question", async () => {
    const result = await sut.execute({
      content: "teste",
      authorId: "test-id",
      title: "test-id",
      attachmentsIds: ["1", "2"],
    });

    console.log(inMemoryQuestionsRepository.items[0].attachments);
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(inMemoryQuestionsRepository.items[0].id).toEqual(
        result.value.question.id
      );
      expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2);
      expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
        expect.objectContaining({
          attachmentId: new UniqueEntityID("1"),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID("2"),
        }),
      ]);
    }
  });
});
