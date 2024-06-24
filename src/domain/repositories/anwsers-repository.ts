import { Anwser } from "../entities /answer";

export interface AnwsersRepository {
  save(anwser: Anwser): Promise<void>;
}
