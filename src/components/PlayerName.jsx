import React, { useRef, useState } from "react";
import {
  RiCheckFill,
  RiCloseFill,
  RiDeleteBin6Fill,
  RiEdit2Fill,
} from "react-icons/ri";
import { useAppState } from "../store/AppContext";

export default function PlayerName({ player, onChange = () => {} }) {
  const { actions, computePlayersArray } = useAppState();
  const derivedPlayerArray = computePlayersArray();
  const [isEditing, setIsEditing] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState(player.name);

  const handleNameChange = (e) => {
    setNewPlayerName(e.target.value);
  };
  const inputRef = useRef();

  const handleDeletePlayer = (playerId) => {
    const newPlayerArray = derivedPlayerArray.filter(
      (player) => player.id !== playerId
    );
    //reorder the players
    newPlayerArray.forEach((player, index) => {
      player.order = index + 1;
    });
    actions.setPlayers(newPlayerArray);
  };

  const handleUpdatePlayerName = () => {
    const payload = { id: player.id, name: newPlayerName };
    actions.changePlayerName(payload);
    setIsEditing(false);
  };

  return (
    <li
      key={player.id}
      className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded"
    >
      <input
        className={`border ml-2 p-1 rounded-md ${
          !isEditing ? "bg-gray-200" : ""
        }`}
        type="text"
        value={newPlayerName}
        onChange={(e) => handleNameChange(e)}
        ref={inputRef}
        readOnly={!isEditing}
      />
      <div className="flex items-center">
        {isEditing ? (
          <div>
            <button
              className="text-blue-500 mr-2"
              onClick={() => handleUpdatePlayerName()}
            >
              <RiCheckFill />
            </button>
            <button
              className="text-red-500"
              onClick={() => setIsEditing(false)}
            >
              <RiCloseFill />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="text-blue-500 mr-2"
              onClick={() => setIsEditing(true)}
            >
              <RiEdit2Fill />
            </button>
            <button
              className="text-red-500"
              onClick={() => handleDeletePlayer(player.id)}
            >
              <RiDeleteBin6Fill />
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
