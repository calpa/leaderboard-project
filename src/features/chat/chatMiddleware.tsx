import { Middleware } from 'redux'
import { io, Socket } from 'socket.io-client';
import { chatActions } from './chatSlice';
import ChatEvent from './chatEvent';
import ChatMessage from "./chatMessage";

const chatMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    console.log(action)
    const isConnectionEstablished = socket && store.getState().chat.isConnected;

    if (chatActions.startConnecting.match(action)) {
      socket = io(process.env.REACT_APP_API_URL, {
        withCredentials: true,
      });

      socket.on('connect', () => {
        store.dispatch(chatActions.connectionEstablished());
        socket.emit(ChatEvent.RequestAllMessages);
      })

      socket.on(ChatEvent.SendAllMessages, (messages: ChatMessage[]) => {
        store.dispatch(chatActions.receiveAllMessages({ messages }));
      })

      socket.on(ChatEvent.ReceiveMessage, (message: ChatMessage) => {
        store.dispatch(chatActions.receiveMessage({ message }));
      })
    }

    if (chatActions.submitMessage.match(action) && isConnectionEstablished) {
      socket.emit(ChatEvent.SendMessage, action.payload.content);
    }

    next(action);
  }
}

export default chatMiddleware;