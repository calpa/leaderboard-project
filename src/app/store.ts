import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chatReducer from '../features/chat/chatSlice';
import loggerMiddleware from './loggerMiddleware';
import crashMiddleware from './crashMiddleware';
import chatMiddleware from '../features/chat/chatMiddleware';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([crashMiddleware, loggerMiddleware, chatMiddleware])
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
