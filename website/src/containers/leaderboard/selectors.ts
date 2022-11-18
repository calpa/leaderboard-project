export const selectLeaderboard = state => {
    return state.leaderboard
}

export const selectPlayers = state => {
    const players = state.leaderboard.players.slice()
    return players.sort((a, b) => b.scores - a.scores)
}