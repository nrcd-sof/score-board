import React, { useRef, useState } from "react";
import {
  RiCheckFill,
  RiCloseFill,
  RiDeleteBin6Fill,
  RiDraggable,
  RiEdit2Fill,
} from "react-icons/ri";
import { useAppState } from "../store/AppContext";

export default function PlayerName({ player }) {
  const {
    actions,
    computedStates: { computePlayersArray },
  } = useAppState();
  const derivedPlayerArray = computePlayersArray();
  const [isEditing, setIsEditing] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState(player.name);
  const [playerNameBeforeEdit, setPlayerNameBeforeEdit] = useState(player.name);

  const inputRef = useRef();

  const startEdit = () => {
    setIsEditing(true);
    inputRef.current.focus();
    inputRef.current.select(); // Select the entire text in the input field

    setPlayerNameBeforeEdit(player.name);
  };

  const cancelEdit = (e) => {
    if (e.type === "blur") return;
    setIsEditing(false);
    inputRef.current.value = playerNameBeforeEdit;
    setNewPlayerName(playerNameBeforeEdit);
  };

  const handleNameChange = (e) => {
    e.stopPropagation();
    setNewPlayerName(e.target.value);
  };

  const handleUpdatePlayerName = (e) => {
    e.preventDefault();
    const payload = { id: player.id, name: newPlayerName };
    actions.changePlayerName(payload);
    setIsEditing(false);
    setPlayerNameBeforeEdit(newPlayerName);
    focusNextTabElement(e);
  };

  const handleDeletePlayer = (playerId) => {
    const newPlayerArray = derivedPlayerArray.filter(
      (player) => player.id !== playerId
    );
    //reorder the players
    newPlayerArray.forEach((player, index) => {
      player.order = index + 1;
    });
    actions.setPlayers(newPlayerArray);
    focusNextTabElement(null);
  };

  const handleBlur = (e) => {
    if (document.activeElement.tagName !== "BUTTON" && isEditing) {
      cancelEdit(e);
    }
  };

  const focusNextTabElement = (e) => {
    e.preventDefault();
    const nextTabIndex =
      player.order < derivedPlayerArray.length ? player.order + 1 : 1;
    const nextElement = document.querySelector(`[tabindex="${nextTabIndex}"]`);
    console.log("nextElement", nextElement);
    nextElement.focus();
  };

  //   useEffect(() => {
  //     console.log("playerName updated:", newPlayerName);
  //   }, [newPlayerName]);

  return (
    <>
      <div className="flex items-center cursor-move rounded-sm bg-slate-200">
        <RiDraggable className="mr-1" />
        <span className="text-lg font-bold pr-2">{player.order}</span>
      </div>
      <input
        className={`w-[66%] border ml-2 p-1 rounded-md ${
          !isEditing ? "bg-gray-200" : ""
        }`}
        type="text"
        value={newPlayerName}
        onChange={(e) => handleNameChange(e)}
        onFocus={() => {
          setIsEditing(true);
          inputRef.current.select();
        }}
        onBlur={handleBlur}
        ref={inputRef}
        readOnly={!isEditing}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            cancelEdit(e);
            focusNextTabElement(e);
          }
          if (e.key === "Escape") {
            cancelEdit(e);
            focusNextTabElement(e);
          }

          if (isEditing && e.key === "Enter") {
            handleUpdatePlayerName(e);
          }
        }}
        tabIndex={player.order}
      />
      <div className="flex items-center">
        {isEditing ? (
          <div>
            <button
              tabIndex="-1"
              className="text-blue-500 mr-2"
              onClick={(e) => {
                console.log("check clicked");
                handleUpdatePlayerName(e);
              }}
            >
              <RiCheckFill />
            </button>
            <button tabIndex="-1" className="text-red-500" onClick={cancelEdit}>
              <RiCloseFill />
            </button>
          </div>
        ) : (
          <div>
            <button
              tabIndex="-1"
              className="text-blue-500 mr-2"
              onClick={startEdit}
            >
              <RiEdit2Fill />
            </button>
            <button
              tabIndex="-1"
              className="text-red-400 hover:text-red-500"
              onClick={() => handleDeletePlayer(player.id)}
            >
              <RiDeleteBin6Fill />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
