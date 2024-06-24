import { Answer } from "../entities /answer";

export interface AnswerRepository {
  save(answer: Answer): Promise<void>;
}
