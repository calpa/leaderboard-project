
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Player from "./player";

export interface leaderboardState {
    players: [],
    isEstablishingConnection: boolean;
    isConnected: boolean;
}

const initialState: leaderboardState = {
    players: [],
    isEstablishingConnection: false,
    isConnected: false
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
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
            players: Player[]
        }>) => {
            state.players = action.payload.players;
        }),

        updatePlayer: ((state, action: PayloadAction<{
            player: Player
        }>) => {
            const { player } = action.payload
            // console.log(player)
            state.players.find(p => p.id === player.id).scores = player.scores
        })
    },
});

export const leaderboardActions = leaderboardSlice.actions;

export default leaderboardSlice.reducer;