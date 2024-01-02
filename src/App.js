import { useEffect } from "react";
import Header from "./components/Header";
import logo from "./logo.png";
import { useAppState } from "./store/AppContext";

function App() {
  const {
    translate,
    state: { theme },
  } = useAppState();

  useEffect(() => {
    // Update the body style when the theme changes
    document.body.style.backgroundColor =
      theme === "dark" ? "#737057" : "rgb(240, 253, 244)";
  }, [theme]);

  return (
    <>
      <Header />
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <header>
          <div className="m-6 p-6 rounded-lg md:flex md:items-center md:justify-between">
            <img
              src={logo}
              className="max-h-[250px] md:w-[60%] mx-auto rounded-lg hover:scale-[105%] transition duration-500 ease-in-out transform hover:shadow-2xl"
              alt="logo"
            />
            <div className="flex flex-col items-center justify-center mt-3 md:w-[60%] md:pl-6 text-center">
              <h1 className=" pb-4 text-3xl md:text-4xl font-bold">
                Score Board
              </h1>
              <p className="font-semibold">{translate("gameDescription")}</p>
              <div className="text-center pl-6">
                <ul className="list-disc list-inside pl-1 text-sm">
                  <li className="text-left pt-2">{translate("feature1")} </li>
                  <li className="text-left">{translate("feature2")}</li>
                  <li className="text-left">{translate("feature3")}</li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
