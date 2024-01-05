import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
import { useAppState } from "../store/AppContext";
import PlayerName from "./PlayerName";

export default function PlayerListModal({ isOpen, onClose }) {
  const { actions, computePlayersArray, translate } = useAppState();
  const [newPlayerName, setNewPlayerName] = useState("");
  const inputRef = useRef();

  const derivedPlayerArray = computePlayersArray();
  console.log("Modal: derivedPlayerArray", derivedPlayerArray);

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== "") {
      const min = 100000; // Minimum value (6 digits)
      const max = 9999999; // Maximum value (7 digits)

      const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(randomId);
      const newPlayer = {
        id: randomId,
        name: newPlayerName,
        order: derivedPlayerArray.length + 1,
      };
      actions.addPlayer(newPlayer);
      setNewPlayerName("");
      inputRef.current.focus();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center p-4">
        <h2 className="text-2xl font-bold mb-4">Player Management</h2>
        <div className="mb-4 flex items-center">
          <label className="mr-2">
            Add Player:
            <input
              className="border ml-2 p-1 rounded-md"
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              ref={inputRef}
            />
          </label>
          <button
            className="bg-green-700 text-white px-3 py-1 rounded"
            onClick={handleAddPlayer}
          >
            Add
          </button>
        </div>
        <ul className="w-full">
          {derivedPlayerArray.map((player) => (
            <PlayerName key={player.id} player={player} />
          ))}
        </ul>
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded-3xl"
        onClick={onClose}
      >
        {translate("close")}
      </button>
    </Modal>
  );
}
