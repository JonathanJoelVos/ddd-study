import { Entity } from "../../core/entities/entity";

interface AnwserProps {
  content: string;
  authorId: string;
  questionId: string;
}

export class Anwser extends Entity {
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor(props: AnwserProps, id?: string) {
    super(id);
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
  }
}
