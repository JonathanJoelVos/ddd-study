import { Entity } from "../../core/entities/entity";

interface AnwserProps {
  content: string;
  authorId: string;
  questionId: string;
}

export class Anwser extends Entity<AnwserProps> {
  constructor(props: AnwserProps, id?: string) {
    super(props, id);
  }
}
