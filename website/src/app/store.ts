import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';

import loggerMiddleware from './loggerMiddleware';
import crashMiddleware from './crashMiddleware';
import leaderboardMiddleware from '../features/leaderboard/leaderboardMiddleware';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([crashMiddleware, loggerMiddleware, leaderboardMiddleware]);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
