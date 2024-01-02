import React from "react";
import { MdDarkMode, MdLanguage, MdLightMode } from "react-icons/md";
import logo from "../logo.png";
import { useAppState } from "../store/AppContext";

const Header = () => {
  const { state, actions } = useAppState();

  const { theme, language } = state;
  return (
    <div
      className={`${
        theme === "light"
          ? "bg-header-light border-header-light"
          : "bg-header-dark border-header-dark"
      } border-b shadow-sm sticky top-0 z-40`}
    >
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="ScoreBoard Logo"
            className="h-8 w-8 mr-2 rounded-full"
          />
          <span className="text-lg font-bold">Score Board</span>
        </div>
        <div>
          <ul className="flex space-x-4">
            {/* Theme Switcher */}
            <li className="flex items-center space-x-4">
              <button className="text-sm" onClick={actions.toggleTheme}>
                {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
              </button>
            </li>

            {/* Language Switcher */}
            <li className="flex items-center space-x-1">
              <button
                className="text-sm flex items-center space-x-1"
                onClick={actions.toggleLanguage}
              >
                <MdLanguage className="h-4 w-4 text-green-600" />
                <span className="top-0 right-0 p-1 text-xs bg-green-700 text-white rounded">
                  {language}
                </span>
              </button>
            </li>

            {/* Sign-in Button */}
            <li className="flex items-center space-x-1">
              <button
                className={`mt-1 mb-1 text-sm border rounded-full px-4 py-2 border-header-${theme}`}
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
