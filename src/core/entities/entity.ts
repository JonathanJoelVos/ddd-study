//Essa classe é uma classe que todas entidades do nosso programa extendem
// usamos ela para manter e padronizar partes que se repetem em todas entidades como id, construtor...

import { randomUUID } from "node:crypto";

export class Entity {
  private _id: string;

  get id() {
    return this._id;
  }

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }
}
