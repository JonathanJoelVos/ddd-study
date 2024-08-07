import { WatchedList } from "@/core/entities/watched-list";
import { AnswerAttachment } from "./answer-attatchment";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment) {
    return a.attachmentId === b.attachmentId;
  }
}
