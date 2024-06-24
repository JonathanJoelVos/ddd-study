import { Entity } from "../../core/entities/entity";

export class Instructor extends Entity {
  public name: string;

  constructor(name: string, id?: string) {
    super(id);
    this.name = name;
  }
}
