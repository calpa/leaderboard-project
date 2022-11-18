interface ChatMessage {
    id: number;
    content: string;
    author: {
      email: string;
    }
  }

export default ChatMessage;