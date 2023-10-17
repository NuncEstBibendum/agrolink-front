import { get, post } from "./utils.service";

export const sendFirstMessage = async ({
  title,
  message,
  tags,
}: {
  title: string;
  message: string;
  tags: string[];
}) => {
  const res = await post("/message/first", {
    title,
    message,
    tags,
  });
  return res.data;
};

export const sendMessage = async ({
  conversationId,
  message,
}: {
  conversationId: string;
  message: string;
}) => {
  const res = await post("/message", {
    conversationId,
    message,
  });
  return res.data;
};

export const getUserConversations = async () => {
  const res = await get("/conversations");
  return res.data;
};

export const getAllUnansweredConversations = async () => {
  const res = await get("/conversations/unanswered");
  return res.data;
};

export const getConversationById = async (conversationId: string) => {
  const res = await get(`/conversations/id/?id=${conversationId}`);
  return res.data;
};
