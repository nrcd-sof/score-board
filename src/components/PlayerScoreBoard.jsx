import React, { useEffect, useRef, useState } from "react";

export default function PlayerScoreBoard({
  player,
  isTemporaryWinner,
  handleSubmit,
}) {
  const [scoreInput, setScoreInput] = useState("");
  const inputRef = useRef();
  const { id, name, isCurrentPlayer, totalScore } = player;

  const handleScoreChange = (e) => {
    const newScore = +e.target.value;
    // Validate if the entered value is a valid numeric string
    if (!isNaN(newScore) && /^[0-9]*$/.test(newScore)) {
      // Update the scoreInput state
      setScoreInput(newScore);
    }
  };

  useEffect(() => {
    if (isCurrentPlayer) {
      // Set focus to the input element
      inputRef.current.focus();
      // Clear the input field
      setScoreInput("");
    }
  }, [isCurrentPlayer]);

  return (
    <div
      key={id}
      className={`bg-gray-200 p-4 rounded focus:outline-none ${
        isTemporaryWinner ? "bg-green-200" : ""
      }`}
    >
      <label className="block mb-2">
        <span className="text-lg font-bold">{name}</span>
        <input
          type="text"
          value={scoreInput}
          onChange={(e) => handleScoreChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Tab") {
              e.preventDefault(); // Prevent default Tab behavior
              handleSubmit(e);
            }
          }}
          ref={inputRef}
          readOnly={!isCurrentPlayer}
          className="w-full border p-2 mt-1 focus:outline-none"
        />
      </label>
      <p className="text-lg font-bold">Score: {totalScore}</p>
    </div>
  );
}
