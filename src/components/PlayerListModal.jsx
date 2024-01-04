import React, { useRef, useState } from "react";
import { useAppState } from "../store/AppContext";
import Modal from "./Modal";

export default function PlayerListModal({ isOpen, onClose }) {
  const {
    actions,
    state: { players },
  } = useAppState();
  const [newPlayerName, setNewPlayerName] = useState("");
  const inputRef = useRef();

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== "") {
      actions.addPlayer({ name: newPlayerName });
      setNewPlayerName("");
      inputRef.current.focus();
    }
  };

  const handleDeletePlayer = (playerId) => {
    actions.deletePlayer(playerId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Player Management</h2>
        <div className="mb-4">
          <label>
            Add Player:
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              ref={inputRef}
            />
          </label>
          <button onClick={handleAddPlayer}>Add</button>
        </div>
        <ul>
          {players.map((player) => (
            <li
              key={player.id}
              className="flex items-center justify-between mb-2"
            >
              {player.name}
              <button onClick={() => handleDeletePlayer(player.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
