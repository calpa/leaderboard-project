import { Middleware } from 'redux'
import { io, Socket } from 'socket.io-client';
import { leaderboardActions } from './leaderboardSlice';
import LeaderboardEvent from './leaderboardEvent';
import Player from "./player";

const leaderboardMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    if (leaderboardActions.startConnecting.match(action)) {
      const url = process.env.REACT_APP_API_URL
      socket = io(url, {
        // withCredentials: true,
      });

      socket.on('connect', () => {
        store.dispatch(leaderboardActions.connectionEstablished());
        socket.emit(LeaderboardEvent.RequestAllPlayers);
      })

      socket.on(LeaderboardEvent.RequestAllPlayersSuccess, (players: Player[]) =>{
        store.dispatch(leaderboardActions.requestAllPlayersSuccess({players}));
      })
    }

    next(action);
  }
}

export default leaderboardMiddleware;