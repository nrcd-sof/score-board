import React from "react";
import { useAppState } from "../store/AppContext";
import PlayerScoreBoard from "./PlayerScoreBoard";

const MultiPlayerScoreTracker = () => {
  const {
    state: { currentPlayerId, players, scores },
    actions,
  } = useAppState();

  // playerTotalScores is an array of objects with the following structure: {id: 1, totalScore: 0} that gets updated every time a score is added
  const playerTotalScores = players.map((player) => ({
    playerId: player.id,
    playerName: player.name,
    playerOrder: player.order,
    isCurrentPlayer: player.id === currentPlayerId,
    totalScore: scores
      .filter((score) => score.playerId === player.id)
      .reduce((acc, score) => acc + score.score, 0),
  }));

  // Find if the player has the highest score
  const isTemporaryWinner = (playerId) => {
    let temporaryWinner = -1;
    let maxScore = -1;
    for (let i = 0; i < playerTotalScores.length; i++) {
      if (playerTotalScores[i].totalScore > maxScore) {
        maxScore = playerTotalScores[i].totalScore;
        temporaryWinner = i;
      }
    }
    return temporaryWinner === playerId;
  };

  const handleSubmit = (e) => {
    const lastScore = +e.currentTarget.value;
    playerTotalScores[currentPlayerId] += isNaN(lastScore) ? 0 : lastScore;
    addScore(lastScore, currentPlayerId);

    // Switch focus to the next player
    const nextPlayerId = getNextPlayerId();
    actions.setCurrentPlayerId(nextPlayerId);
  };

  const getNextPlayerId = () => {
    const currentPlayerIndex = players.findIndex(
      (player) => player.id === currentPlayerId
    );
    const nextOrder = (players[currentPlayerIndex].order % players.length) + 1;
    console.log("nextOrder", nextOrder);
    const nextPlayerIndex = players.findIndex(
      (player) => player.order === nextOrder
    );
    return players[nextPlayerIndex].id;
  };

  const addScore = (newScore, playerId) => {
    const newRound =
      scores.length === 0 ? 1 : 1 + Math.floor(scores.length / players.length);
    console.log("Round", newRound);
    const scoreObject = {
      playerId: playerId,
      round: newRound,
      score: 0,
    };

    if (!isNaN(newScore) && /^[0-9]*$/.test(newScore)) {
      scoreObject.score = newScore;
      actions.addScore(scoreObject);
    }
  };

  //   useEffect(() => {
  //     // Set focus to the current player's input field when currentPlayer changes
  //     inputRefs[currentPlayerId].current.focus();
  //   }, [currentPlayerId, inputRefs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {playerTotalScores.map((player, index) => (
        <PlayerScoreBoard
          key={index}
          player={player}
          isTemporaryWinner={isTemporaryWinner(player.playerId)}
          handleSubmit={handleSubmit}
        />
      ))}
    </div>
  );
};

export default MultiPlayerScoreTracker;
