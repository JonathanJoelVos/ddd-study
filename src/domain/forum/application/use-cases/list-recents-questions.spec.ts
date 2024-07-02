import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { ListRecentsQuestionsUseCase } from "./list-recents-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ListRecentsQuestionsUseCase;

describe("Create Question use case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ListRecentsQuestionsUseCase(inMemoryQuestionsRepository);
  });
  it("should be able to list recents questions", async () => {
    inMemoryQuestionsRepository.save(
      makeQuestion({
        createdAt: new Date(2024, 0, 20),
      })
    );
    inMemoryQuestionsRepository.save(
      makeQuestion({
        createdAt: new Date(2024, 0, 18),
      })
    );
    inMemoryQuestionsRepository.save(
      makeQuestion({
        createdAt: new Date(2024, 0, 23),
      })
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.questions).toEqual([
        expect.objectContaining({
          createdAt: new Date(2024, 0, 23),
        }),
        expect.objectContaining({
          createdAt: new Date(2024, 0, 20),
        }),
        expect.objectContaining({
          createdAt: new Date(2024, 0, 18),
        }),
      ]);
    }
  });
  it("should be able to list paginated recents questions", async () => {
    for (let i = 0; i < 22; i++) {
      inMemoryQuestionsRepository.save(makeQuestion());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(2);
    }
  });
});
