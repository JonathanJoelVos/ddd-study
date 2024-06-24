import { randomUUID } from "crypto";

interface AnwserProps {
  content: string;
  authorId: string;
  questionId: string;
}

export class Anwser {
  public id: string;
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor(props: AnwserProps, id?: string) {
    this.id = id ?? randomUUID();
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
  }
}
