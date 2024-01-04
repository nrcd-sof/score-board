import React, { useEffect, useRef, useState } from "react";
import { useAppState } from "../store/AppContext";

// Find the player with the highest score
const findTemporaryWinner = (currentScores) => {
  let temporaryWinner = -1;
  let maxScore = -1;
  for (let i = 0; i < currentScores.length; i++) {
    if (currentScores[i].totalScore > maxScore) {
      maxScore = currentScores[i].totalScore;
      temporaryWinner = i;
    }
  }
  return temporaryWinner;
};

const MultiPlayerScoreTracker = () => {
  const {
    state: { currentPlayerId, players, scores },
    actions,
  } = useAppState();

  // playerTotalScores is an array of objects with the following structure: {id: 1, totalScore: 0} that gets updated every time a score is added
  const playerTotalScores = players.map((player) => ({
    playerId: player.id,
    totalScore: scores
      .filter((score) => score.playerId === player.id)
      .reduce((acc, score) => acc + score.score, 0),
  }));

  const [scoreInputs, setScoreInputs] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleScoreChange = (e, playerId) => {
    const newScore = +e.target.value;
    console.log(newScore);
    // Validate if the entered value is a valid numeric string
    if (!isNaN(newScore) && /^[0-9]*$/.test(newScore)) {
      // Update the scoreInputs state
      const updatedScoreInputs = [...scoreInputs];
      updatedScoreInputs[playerId] = newScore;
      setScoreInputs(updatedScoreInputs);
    }
  };

  function addScore(newScore, playerId) {
    const newRound =
      scores.length === 0
        ? 1
        : 1 + Math.floor((scores.length - 1) / players.length);
    const scoreObject = {
      playerId: playerId,
      round: newRound,
      score: 0,
    };

    if (!isNaN(newScore) && /^[0-9]*$/.test(newScore)) {
      scoreObject.score = newScore;
      actions.addScore(scoreObject);
    }
  }

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

  const handleSubmit = () => {
    const lastScore = +scoreInputs[currentPlayerId];
    playerTotalScores[currentPlayerId] += isNaN(lastScore) ? 0 : lastScore;
    addScore(lastScore, currentPlayerId);
    setScoreInputs(["", "", "", ""]);

    // Switch focus to the next player
    const nextPlayerId = getNextPlayerId();
    actions.setCurrentPlayerId(nextPlayerId);
    inputRefs[currentPlayerId].current.focus();
  };

  useEffect(() => {
    // Set focus to the current player's input field when currentPlayer changes
    inputRefs[currentPlayerId].current.focus();
  }, [currentPlayerId, inputRefs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {playerTotalScores.map((score, index) => (
        <div
          key={index}
          className={`bg-gray-200 p-4 rounded focus:outline-none ${
            findTemporaryWinner(playerTotalScores) === index
              ? "bg-green-200"
              : ""
          }`}
        >
          <label className="block mb-2">
            Player {index + 1}'s Score:
            <input
              type="text"
              value={scoreInputs[index]}
              onChange={(e) => handleScoreChange(e, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Tab") {
                  e.preventDefault(); // Prevent default Tab behavior
                  handleSubmit();
                }
              }}
              ref={inputRefs[index]}
              readOnly={index !== currentPlayerId}
              className="w-full border p-2 mt-1 focus:outline-none"
            />
          </label>
          <p className="text-lg font-bold">Score: {score.totalScore}</p>
        </div>
      ))}
    </div>
  );
};

export default MultiPlayerScoreTracker;
