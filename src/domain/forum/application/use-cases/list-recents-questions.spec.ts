import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { Slug } from "../../enterprise/entities/value-objects/slug";
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

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
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
  });
  it("should be able to list paginated recents questions", async () => {
    for (let i = 0; i < 22; i++) {
      inMemoryQuestionsRepository.save(makeQuestion());
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
