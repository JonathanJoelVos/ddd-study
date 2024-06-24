import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
}

export class Question extends Entity {
  public title: string;
  public content: string;
  public authorId: string;
  public slug: Slug;

  constructor(props: QuestionProps, id?: string) {
    super(id);
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
    this.slug = props.slug;
  }
}
