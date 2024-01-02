import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import { AppProvider } from "./store/AppContext";

// Mock the Header component
jest.mock("./components/Header", () => () => (
  <div data-testid="mocked-header">Mocked Header</div>
));

describe("App", () => {
  it("renders App component with initial state", () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    //further content checks
  });

  it("changes body background color", () => {
    const { rerender } = render(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Initial body background color
    expect(getComputedStyle(document.body).backgroundColor).toBe(
      "rgb(240, 253, 244)"
    );

    /*-------------------------
    // this last test is giving me headaches, I don't know how to change the state of the app to test the body background color change
    // Change state
    jest.mock("./store/AppContext", () => ({
      ...jest.requireActual("./store/AppContext"),
      useAppState: () => ({
        state: { theme: "dark", language: "EN" },
        actions: { toggleTheme: jest.fn(), toggleLanguage: jest.fn() },
        styles: {},
        translate: jest.fn(),
      }),
    }));
    rerender(
      <AppProvider>
        <App />
      </AppProvider>
    );

    // Updated body background color for "dark" theme
    expect(getComputedStyle(document.body).backgroundColor).toBe("#737057");
    -------------------------*/
  });
});

/* ----- the idea behind this test is to check if all text elements are translated correctly. Need to give some more thoughts ----- */

// describe("Translation Testing", () => {
//   it("translates all eligible text elements using translate function", () => {
//     const mockUseAppState = jest.fn(() => ({
//       state: { theme: "light", language: "EN" },
//       actions: { toggleTheme: jest.fn(), toggleLanguage: jest.fn() },
//       translate: jest.fn((token) => `Translated: ${token}`),
//       styles: {},
//     }));

//     render(
//       <AppProvider>
//         <App />
//       </AppProvider>
//     );

//     // Query all text elements in the rendered component
//     const allTextElements = screen.queryAllByText((content, element) => {
//       console.log(element.nodeType);
//       // Define your criteria for eligible text elements
//       const isEligible =
//         element.textContent && element.textContent.trim().length > 0;
//       isEligible && console.log(element.textContent);

//       return isEligible;
//     });
//     console.log("elements with thextContent", allTextElements.length);

//     // Check each eligible text element's content
//     allTextElements.forEach((textElement) => {
//       // Get the token from the text content without leading/trailing spaces
//       const token = textElement.textContent.trim();

//       // Check if the text content has been translated correctly
//       expect(mockUseAppState().translate).toHaveBeenCalledWith(token);

//       // Check if the rendered text matches the expected translation
//       expect(textElement.textContent).toBe(`Translated: ${token}`);
//     });
//   });
// });
