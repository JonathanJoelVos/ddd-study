//Essa classe é uma classe que todas entidades do nosso programa extendem
// usamos ela para manter e padronizar partes que se repetem em todas entidades como id, construtor...

import { UniqueEntityID } from "./unique-entity-id";

export class Entity<T> {
  private _id: UniqueEntityID;
  protected props: T;

  get id() {
    return this._id;
  }

  //colocamos protected para que só as classes que extendem possam usar ele isso faz com que se usarmos um Answer extends Entity e fizermos um método static create { return new Answer()} isso força com que seja obrigatório usar o método create para instanciar a Answer (já que não é possível instanciar a Answer pois ela usa o construtor de Entity apenas)
  protected constructor(props: T, id?: string) {
    this._id = new UniqueEntityID(id);
    this.props = props;
  }
}
