import { describe, expect, it } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswerRepository } from "../repositories/answers-repository";

const fakeRepository: AnswerRepository = {
  async save(data: any) {
    return;
  },
};

describe("Answer question use case", () => {
  it("should be able to create an answer", async () => {
    const sut = new AnswerQuestionUseCase(fakeRepository);
    const answer = await sut.execute({
      content: "teste",
      instructorId: "test-id",
      questionId: "test-id",
    });
    expect(answer.content).toEqual("teste");
  });
});
