import { Entity } from "../../core/entities/entity";

export class Student extends Entity {
  public name: string;

  constructor(name: string, id?: string) {
    super(id);
    this.name = name;
  }
}
