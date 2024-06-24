//Essa classe é uma classe que todas entidades do nosso programa extendem
// usamos ela para manter e padronizar partes que se repetem em todas entidades como id, construtor...

import { UniqueEntityID } from "./unique-entity-id";

export class Entity<T> {
  private _id: UniqueEntityID;
  protected props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this._id = new UniqueEntityID(id);
    this.props = props;
  }
}
