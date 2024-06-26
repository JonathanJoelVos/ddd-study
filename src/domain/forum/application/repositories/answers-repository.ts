import { Answer } from "../../enterprise/entities /answer";

export interface AnswerRepository {
  save(answer: Answer): Promise<void>;
}
