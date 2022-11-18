export const selectLeaderboard = (state) => {
  return state.leaderboard;
};

export const selectPlayers = (state) => {
  let players = state.leaderboard.players.slice();
  players = players.sort((a, b) => b.scores - a.scores);
  players = players.map((player, index) => ({
    ...player,
    ranking: index + 1
  }))

  return players
};
