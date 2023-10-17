import { Message } from "./Message";
import { MessageUser } from "./User";

export type Conversation = {
  id: string;
  messages: Message[];
  title: string;
  tags: Tag[];
  users: MessageUser[];
  author: { name: string };
};

export type Tag = {
  id: string;
  color: string;
  name: string;
};
