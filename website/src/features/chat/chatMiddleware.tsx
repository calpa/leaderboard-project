import { Middleware } from 'redux'
import { io, Socket } from 'socket.io-client';
import { chatActions } from './chatSlice';
import ChatEvent from './chatEvent';
import ChatMessage from "./chatMessage";

const chatMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;

    if (chatActions.startConnecting.match(action)) {
      const url = process.env.REACT_APP_API_URL
      socket = io(url, {
        // withCredentials: true,
      });

      socket.on('connect', () => {
        store.dispatch(chatActions.connectionEstablished());
        socket.emit(ChatEvent.RequestAllPlayers);
      })

      socket.on(ChatEvent.RequestAllPlayersSuccess, (players) => {
        store.dispatch(chatActions.requestAllPlayersSuccess({players}));
      })
    }

    if (chatActions.submitMessage.match(action) && isConnectionEstablished) {
      socket.emit(ChatEvent.SendMessage, action.payload.content);
    }

    next(action);
  }
}

export default chatMiddleware;