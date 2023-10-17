import { Conversation } from "../types/models/Conversation";
import { Message } from "../types/models/Message";

export const getMostRecentMessage = (
  conversation: Conversation
): Message | null => {
  if (!conversation.messages.length) {
    return null; // No messages in the conversation
  }

  // Sort the messages based on the 'createdAt' timestamp
  const sortedMessages = [...conversation.messages].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // The first element is now the most recent message
  return sortedMessages[0];
};
