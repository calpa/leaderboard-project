import React from "react";

import "./index.css";

const headings: Array<string> = ["Ranking", "Avatar", "Name", "Scores"];

const Leaderboard = (props = {}) => {
  const { players = [] } = props;

  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          {/* Show the latest status of a game's top x players */}
          {headings.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {players.map((player) => (
          <tr key={player.id}>
            <td>{player.ranking}</td>
            <td>
              <img
                src={player.avatar}
                alt={player.name}
                width="50"
                height="50"
              />
            </td>
            <td>{player.name}</td>
            <td>{player.scores}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
