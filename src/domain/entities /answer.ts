import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface AnwserProps {
  content: string;
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
}

export class Anwser extends Entity<AnwserProps> {
  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }
}
