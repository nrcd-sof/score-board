import React, { createContext, useContext, useReducer } from "react";
import themeSnippets from "./params/styles";
import translations from "./params/translations";

// Initial state
const initialState = {
  theme: "light",
  language: "EN",
};

// Define actions
const actionTypes = {
  TOGGLE_THEME: "TOGGLE_THEME",
  TOGGLE_LANGUAGE: "TOGGLE_LANGUAGE",
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_THEME:
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case actionTypes.TOGGLE_LANGUAGE:
      return { ...state, language: state.language === "EN" ? "DE" : "EN" };
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

  const translate = (token) => {
    return translations[state.language][token] || token; // Fallback to the token if translation is not available
  };

  const styles = themeSnippets[state.theme];
  // console.log(styles);

  return (
    <AppContext.Provider
      value={{
        state,
        actions: { toggleTheme, toggleLanguage },
        translate,
        styles,
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
