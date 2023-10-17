import { MessageUser } from "./User";

export type Message = {
  id: string;
  text: string;
  user: MessageUser;
  hasAnswer: boolean;
  isLiked: boolean | null;
  createdAt: string;
};
