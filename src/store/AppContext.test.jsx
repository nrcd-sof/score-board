import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { AppProvider, useAppState } from "./AppContext";

// Mock translations and styles
jest.mock("./params/translations", () => ({
  EN: {
    someToken: "Some translation",
  },
  DE: {
    someToken: "Irgendeine Übersetzung",
  },
}));

jest.mock("./params/styles", () => ({
  light: {
    backgroundColor: "white",
    color: "black",
  },
  dark: {
    backgroundColor: "black",
    color: "white",
  },
}));

describe("AppProvider", () => {
  it("renders children with the initial context", () => {
    render(
      <AppProvider>
        <div>Child Component</div>
      </AppProvider>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("toggles theme and language on action", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Initial state
    expect(screen.getByText("Current Theme: light")).toBeInTheDocument();
    expect(screen.getByText("Current Language: EN")).toBeInTheDocument();

    // Toggle theme
    fireEvent.click(screen.getByTestId("toggle-theme"));
    expect(screen.getByText("Current Theme: dark")).toBeInTheDocument();

    // Toggle language
    fireEvent.click(screen.getByTestId("toggle-language"));
    expect(screen.getByText("Current Language: DE")).toBeInTheDocument();
  });
});

const TestComponent = () => {
  const { state, actions } = useAppState();

  return (
    <div>
      <div>Current Theme: {state.theme}</div>
      <div>Current Language: {state.language}</div>
      <button onClick={actions.toggleTheme} data-testid="toggle-theme">
        Toggle Theme
      </button>
      <button onClick={actions.toggleLanguage} data-testid="toggle-language">
        Toggle Language
      </button>
    </div>
  );
};
