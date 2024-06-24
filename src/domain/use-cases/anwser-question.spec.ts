import { describe, expect, it } from "vitest";
import { AnwserQuestionUseCase } from "./anwser-question";
import { AnwsersRepository } from "../repositories/anwsers-repository";

const fakeRepository: AnwsersRepository = {
  async save(data: any) {
    return;
  },
};

describe("Anwser question use case", () => {
  it("should be able to create an anwser", async () => {
    const sut = new AnwserQuestionUseCase(fakeRepository);
    const anwser = await sut.execute({
      content: "teste",
      instructorId: "test-id",
      questionId: "test-id",
    });
    expect(anwser.content).toEqual("teste");
  });
});
