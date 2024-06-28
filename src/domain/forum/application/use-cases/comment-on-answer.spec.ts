import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Create Answer use case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });
  it("should be able to create an answer comment", async () => {
    const answer = makeAnswer({}, new UniqueEntityID("answer-1"));
    await inMemoryAnswersRepository.save(answer);

    const { answerComment } = await sut.execute({
      content: "teste",
      authorId: "test-id",
      answerId: "answer-1",
    });

    expect(answerComment.id).toBeTruthy();
    expect(inMemoryAnswerCommentsRepository.items[0].id).toEqual(
      answerComment.id
    );
  });
});
