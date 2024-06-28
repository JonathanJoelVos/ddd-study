import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Create Question use case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });
  it("should be able to create an question", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.createFromText("example-slug"),
    });
    await inMemoryQuestionsRepository.save(newQuestion);

    const { question } = await sut.execute({
      slug: "example-slug",
    });

    expect(question.id).toBeTruthy();
    expect(question.id).toEqual(newQuestion.id);
  });
});
