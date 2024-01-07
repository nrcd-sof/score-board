import React from "react";
import { useAppState } from "../store/AppContext";
import PlayerListModal from "./PlayerListModal";
import PlayerScoreBoard from "./PlayerScoreBoard";

const MultiPlayerScoreTracker = () => {
  const {
    state: { currentPlayerId, scores, showModal },
    actions,
    computedStates: { computePlayersArray },
  } = useAppState();

  // playerTotalScores is an array of objects with the following structure: {id: 1, totalScore: 0} that gets updated every time a score is added
  const derivedPlayerArray = computePlayersArray();

  // Find if the player has the highest score
  const isTemporaryWinner = (playerId) => {
    let playerScore = -1;
    let maxScore = -1;
    for (let i = 0; i < derivedPlayerArray.length; i++) {
      if (derivedPlayerArray[i].id === playerId) {
        playerScore = derivedPlayerArray[i].totalScore;
      }
      if (derivedPlayerArray[i].totalScore > maxScore) {
        maxScore = derivedPlayerArray[i].totalScore;
      }
    }
    return maxScore > 0 && playerScore === maxScore;
  };

  const handleSubmit = (e) => {
    const lastScore = +e.currentTarget.value;
    derivedPlayerArray[currentPlayerId].totalScore += isNaN(lastScore)
      ? 0
      : lastScore;
    addScore(lastScore, currentPlayerId);

    // Switch focus to the next player
    const nextPlayerId = getNextPlayerId();
    actions.setCurrentPlayerId(nextPlayerId);
  };

  const addScore = (newScore, playerId) => {
    const newRound =
      scores.length === 0
        ? 1
        : 1 + Math.floor(scores.length / derivedPlayerArray.length);
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

  const getNextPlayerId = () => {
    const currentPlayerIndex = derivedPlayerArray.findIndex(
      (player) => player.id === currentPlayerId
    );
    const nextOrder =
      (derivedPlayerArray[currentPlayerIndex].order %
        derivedPlayerArray.length) +
      1;
    console.log("nextOrder", nextOrder);
    const nextPlayerIndex = derivedPlayerArray.findIndex(
      (player) => player.order === nextOrder
    );
    return derivedPlayerArray[nextPlayerIndex].id;
  };

  return (
    <>
      <PlayerListModal
        isOpen={showModal}
        onClose={() => {
          actions.toggleModal();
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {derivedPlayerArray.map((player, index) => (
          <PlayerScoreBoard
            key={index}
            player={player}
            isTemporaryWinner={isTemporaryWinner(player.id)}
            handleSubmit={handleSubmit}
            showModal={showModal}
          />
        ))}
      </div>
    </>
  );
};

export default MultiPlayerScoreTracker;
