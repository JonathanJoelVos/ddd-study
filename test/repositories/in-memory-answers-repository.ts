import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async save(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(index, 1);
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }
    return answer;
  }
  async update(answer: Answer) {
    const index = await this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString()
    );

    this.items[index] = answer;
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    return this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice(20 * (page - 1), 20 * page);
  }
}
