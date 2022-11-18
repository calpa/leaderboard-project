export const selectLeaderboard = state => {
    return state.leaderboard
}

export const selectPlayers = state => {
    return state.leaderboard.players
}