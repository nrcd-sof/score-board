import React, { createContext, useContext, useReducer } from "react";
import themeSnippets from "./params/styles";
import translations from "./params/translations";

// Initial state
const initialState = {
  theme: "light",
  language: "EN",
  showModal: false,
  maxScoreId: 0,
  players: {
    0: { name: "Player 1", order: 1 },
    1: { name: "Player 2", order: 2 },
    2: { name: "Player 3", order: 3 },
    3: { name: "Player 4", order: 4 },
  },
  currentPlayerId: 0,
  scores: [],
  // an array of objects {scoreID, playerId, 1, round: 1, score: 10}
  //a more flexible structure as an array of arrays. As there are scoring systems where not all players are allowed to score in all rounds.
};
// 0: { name: "Player 1", order: 1 },
// 1: { name: "Player 2", order: 2 },
// 2: { name: "Player 3", order: 3 },
// 3: { name: "Player 4", order: 4 },

// Define actions
const actionTypes = {
  TOGGLE_THEME: "TOGGLE_THEME",
  TOGGLE_LANGUAGE: "TOGGLE_LANGUAGE",
  TOGGLE_MODAL: "TOGGLE_MODAL",
  SET_CURRENT_PLAYER_ID: "SET_CURRENT_PLAYER_ID",
  ADD_PLAYER: "ADD_PLAYER",
  SET_PLAYERS: "SET_PLAYERS",
  CHANGE_PLAYER_NAME: "CHANGE_PLAYER_NAME",
  ADD_SCORE: "ADD_SCORE",
  EDIT_SCORE: "EDIT_SCORE",
  RESET_SCORES: "RESET_SCORES",
};

// Reducer function
const appReducer = (state, action) => {
  const restorePlayersObject = (computedArray) => {
    const playersObject = {};
    computedArray.forEach((player) => {
      playersObject[player.id] = {
        name: player.name,
        order: player.order,
      };
    });
    return playersObject;
  };

  switch (action.type) {
    case actionTypes.TOGGLE_THEME:
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case actionTypes.TOGGLE_LANGUAGE:
      return { ...state, language: state.language === "EN" ? "DE" : "EN" };
    case actionTypes.TOGGLE_MODAL:
      return { ...state, showModal: !state.showModal };
    case actionTypes.SET_CURRENT_PLAYER_ID:
      // action.payload is the id of the player
      return { ...state, currentPlayerId: action.payload };
    case actionTypes.ADD_PLAYER:
      // action.payload is an object with the following structure: {id: 1, name: "Player 1", order: 1}
      return {
        ...state,
        players: {
          [action.payload.id]: action.payload,
          ...state.players,
        },
      };
    case actionTypes.SET_PLAYERS:
      // action.payload is the new players object
      return { ...state, players: restorePlayersObject(action.payload) };
    case actionTypes.CHANGE_PLAYER_NAME:
      // action.payload is an object with the following structure: {id: 1, name: "Player 1"}
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.id]: {
            ...state.players[action.payload.id],
            name: action.payload.name,
          },
        },
      };
    case actionTypes.ADD_SCORE:
      // a score is an object passed to the payload with a player id, the number of the round and a score value all of witch are numbers.
      // the payload is an object with the following structure: {scoreID, playerId, 1, round: 1, score: 10}
      // the scoreId has to be maxScoreId + 1
      return {
        ...state,
        scores: [
          ...state.scores,
          {
            scoreId: state.maxScoreId + 1,
            playerId: action.payload.playerId,
            round: action.payload.round,
            score: action.payload.score,
          },
        ],
        maxScoreId: state.maxScoreId + 1,
      };
    case actionTypes.EDIT_SCORE:
      // action.payload is an object with the following structure: {scoreId: 1, score: newScoreValue}
      return {
        ...state,
        scores: state.scores.map((score) =>
          score.scoreId === action.payload.scoreId
            ? { ...score, score: action.payload.score }
            : score
        ),
      };
    case actionTypes.RESET_SCORES:
      return { ...state, scores: [{}], maxScoreId: 0, currentPlayerId: 0 };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: actionTypes.TOGGLE_THEME });
  };

  const toggleLanguage = () => {
    dispatch({ type: actionTypes.TOGGLE_LANGUAGE });
  };

  const toggleModal = () => {
    dispatch({ type: actionTypes.TOGGLE_MODAL });
  };

  const setCurrentPlayerId = (playerId) => {
    dispatch({ type: actionTypes.SET_CURRENT_PLAYER_ID, payload: playerId });
  };

  const addPlayer = (player) => {
    dispatch({ type: actionTypes.ADD_PLAYER, payload: player });
  };

  const setPlayers = (players) => {
    dispatch({ type: actionTypes.SET_PLAYERS, payload: players });
  };

  const changePlayerName = (player) => {
    dispatch({ type: actionTypes.CHANGE_PLAYER_NAME, payload: player });
  };

  const addScore = (score) => {
    dispatch({ type: actionTypes.ADD_SCORE, payload: score });
  };

  const editScore = (score) => {
    dispatch({ type: actionTypes.EDIT_SCORE, payload: score });
  };

  const resetScores = () => {
    dispatch({ type: actionTypes.RESET_SCORES });
  };

  const styles = themeSnippets[state.theme];
  // console.log(styles);

  const translate = (token) => {
    return translations[state.language][token] || token; // Fallback to the token if translation is not available
  };

  const computePlayersArray = () => {
    const playerArray = Object.entries(state.players).map(([id, player]) => ({
      id: +id,
      name: player.name,
      order: player.order,
      isCurrentPlayer: +id === state.currentPlayerId,
      totalScore: state.scores
        .filter((score) => score.playerId === +id)
        .reduce((acc, score) => acc + score.score, 0),
    }));

    // Sort the playerArray based on the 'order' property
    playerArray.sort((a, b) => a.order - b.order);

    return playerArray;
  };

  return (
    <AppContext.Provider
      value={{
        state,
        actions: {
          toggleTheme,
          toggleLanguage,
          toggleModal,
          addPlayer,
          setPlayers,
          setCurrentPlayerId,
          changePlayerName,
          addScore,
          editScore,
          resetScores,
        },
        translate,
        styles,
        computePlayersArray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
const useAppState = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppState };
