import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
import { useAppState } from "../store/AppContext";
import PlayerName from "./PlayerName";

export default function PlayerListModal({ isOpen, onClose }) {
  const { actions, computedStates, translate } = useAppState();
  const [newPlayerName, setNewPlayerName] = useState("");
  const inputRef = useRef();

  const [dragOverItemId, setDragOverItemId] = useState(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const derivedPlayerArray = computedStates.computePlayersArray();

  const handleAddPlayer = (e) => {
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
      //   focusFirstPlayer(e);
    }
  };
  const dragStart = (e, id) => {
    dragItem.current = id;
    console.log("dragStart: ", dragItem.current);
  };

  const dragEnter = (e, id) => {
    e.preventDefault();
    dragOverItem.current = id;
    setDragOverItemId(id);
    console.log("dragEnter: ", dragItem.current, "-->", dragOverItem.current);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setDragOverItemId(null);
  };
  const drop = (e, id) => {
    e.preventDefault();
    setDragOverItemId(null);

    // Update the order only if the drop target is different from the source
    if (dragItem.current !== id) {
      const dragItemIndex = derivedPlayerArray.findIndex(
        (item) => item.id === dragItem.current
      );
      const dropItemIndex = derivedPlayerArray.findIndex(
        (item) => item.id === id
      );

      const [draggedItem] = derivedPlayerArray.splice(dragItemIndex, 1);
      derivedPlayerArray.splice(dropItemIndex, 0, draggedItem);

      //reorder the players
      derivedPlayerArray.forEach((player, index) => {
        player.order = index + 1;
      });
      console.log("drop: ", dragItem.current, "-->", dragOverItem.current);
      console.log("drop: ", derivedPlayerArray);
      actions.setPlayers(derivedPlayerArray);
    }

    // Reset refs
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const focusFirstPlayer = (e) => {
    e.preventDefault();

    const firstElement = document.querySelector(`[tabindex="${1}"]`);
    console.log("firstElement", firstElement);
    firstElement?.focus();
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
              //set focus to the input element
              autoFocus
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddPlayer(e);
                }
                if (e.key === "Tab") {
                  focusFirstPlayer(e);
                }
              }}
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
            <li
              key={player.id}
              className={`flex items-center justify-between mb-2 bg-gray-100 p-2 rounded ${
                dragOverItemId === player.id ? "bg-gray-600" : ""
              }`}
              draggable
              onDragStart={(e) => dragStart(e, player.id)}
              onDragEnter={(e) => dragEnter(e, player.id)}
              onDragLeave={(e) => dragLeave(e)}
              onDragOver={allowDrop}
              onDrop={(e) => drop(e, player.id)}
            >
              <PlayerName key={player.id} player={player} />
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-red-400 hover:bg-red-500 text-white w-full font-bold py-2 px-4 rounded-3xl"
        onClick={onClose}
      >
        {translate("close")}
      </button>
    </Modal>
  );
}
