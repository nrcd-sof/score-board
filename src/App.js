import logo from "./logo.png";

function App() {
  return (
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
      <header>
        <div className="m-6 p-6 rounded-lg md:flex md:items-center md:justify-center">
          <img
            src={logo}
            className="max-h-[250px] md:w-[60%] mx-auto rounded-lg hover:scale-[105%]"
            alt="logo"
          />
          <div className="mt-5 w-full md:pl-6 text-center">
            <p className="font-semibold">
              ScoreBoard: Intuitive game scoring with:{" "}
            </p>
            <p className="text-center pl-6">
              <ul className="list-disc list-inside pl-4 text-sm">
                <li className="text-left pt-2">
                  Customizable scoring templates
                </li>
                <li className="text-left">Authentication</li>
                <li className="text-left">Language options</li>
              </ul>
            </p>
            <h1 className="mt-5 text-3xl md:text-4xl font-bold">
              {" "}
              Score Board
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
