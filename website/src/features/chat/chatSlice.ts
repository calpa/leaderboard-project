
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ChatMessage from "./chatMessage";

export interface ChatState {
    players: [],
    isEstablishingConnection: boolean;
    isConnected: boolean;
}

const initialState: ChatState = {
    players: [],
    isEstablishingConnection: false,
    isConnected: false
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        startConnecting: (state => {
            state.isEstablishingConnection = true;
        }),
        connectionEstablished: (state => {
            state.isConnected = true;
            state.isEstablishingConnection = true;
        }),
        requestAllPlayersSuccess: ((state, action: PayloadAction<{
            players: []
        }>) => {
            state.players = action.payload.players;
        }),
        receiveMessage: ((state, action: PayloadAction<{
            message: ChatMessage
        }>) => {
            state.messages.push(action.payload.message);
        }),
        submitMessage: ((state, action: PayloadAction<{
            content: string
        }>) => {
            return;
        })
    },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;