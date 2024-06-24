import { randomUUID } from "node:crypto";

export class UniqueEntityID {
  private _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  get toString() {
    return this._id;
  }

  get toValue() {
    return this._id;
  }
}
