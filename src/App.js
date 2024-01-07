import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Carousel from "./pages/Preview";
import { useAppState } from "./store/AppContext";

function App() {
  const {
    state: { theme },
  } = useAppState();

  useEffect(() => {
    // Update the body style when the theme changes
    document.body.style.backgroundColor =
      theme === "dark" ? "#737057" : "rgb(240, 253, 244)";
  }, [theme]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/preview" element={<Carousel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
