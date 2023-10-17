import { MessageUser } from "./User";

export type Message = {
  id: string;
  text: string;
  user: MessageUser;
  createdAt: string;
};
