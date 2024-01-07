import React, { useEffect, useRef, useState } from "react";

function Card({
  data,
  inputRef,
  cardsRef,
  positions,
  index,
  activeIndex,
  setActiveIndex,
  handleTransitionEnd,
}) {
  const myInputRef = useRef();
  useEffect(() => {
    inputRef(myInputRef);
  }, [myInputRef, inputRef]);

  const cardsCount = positions.length;
  const prevPos = (pos) => (pos - 1 + cardsCount) % cardsCount;
  const nextPos = (pos) => (pos + 1) % cardsCount;
  const getMyPositionIndex = () => {
    // determine the position index of the card depending on the active index
    // the card with the active index should get position index 0
    let posIndex = index;
    let tabsToActice = 0; // number of tabs to reach the active index
    while (posIndex !== activeIndex) {
      posIndex = prevPos(posIndex);
      tabsToActice++;
    }
    posIndex = tabsToActice;
    console.log("index-->posIndex", index, "-->", posIndex);
    return posIndex;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      e.preventDefault();
      cardsRef.current[activeIndex].style.backgroundColor =
        "rgb(148, 163, 184)";
      cardsRef.current[activeIndex].style.opacity = "0.5";

      if (e.shiftKey) {
        // Handle Shift + Tab
        setActiveIndex((prevIndex) => {
          const newIndex = prevPos(prevIndex);
          return newIndex;
        });
      } else {
        // Handle Tab
        setActiveIndex((prevIndex) => {
          const newIndex = nextPos(prevIndex);
          return newIndex;
        });
      }
    }
  };

  return (
    <div
      key={index}
      className="absolute transition-all bg-slate-200 duration-500 w-40 h-[250px] p-4 border border-solid border-gray-500 rounded focus:outline-none"
      onTransitionEnd={() => handleTransitionEnd()}
      style={{
        ...positions[getMyPositionIndex()],
        transition: "left 1s, top 1s", // Apply smooth transition
      }}
    >
      <input
        type="text"
        ref={myInputRef}
        className="w-full h-16 p-4 border rounded focus:border-green-400 focus:outline-none 
            "
        onKeyDown={handleKeyPress}
        value={getMyPositionIndex()}
      />
    </div>
  );
}

const Carousel = ({
  arr = ["sof", "anas", "Ahmed", "Ouwais", "Fares", "Yunus", "Yassine"],
}) => {
  console.log("Carousel is rendering");

  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef([]);

  const positions = arr.map((_, index) => {
    const totalInputs = arr.length;
    const rotation = Math.floor(360 / totalInputs);
    const rest = 360 - rotation * totalInputs;
    console.log("rest: ", rest);
    let angle = (270 + rotation * index) % 360;
    if (rest > 0 && index > totalInputs / 2) {
      angle = (270 + rotation * index + rest) % 360;
    }
    const radiusX = 100;
    const radiusY = 100;
    const centerX = 200;
    const centerY = 200;

    const x = Math.round(centerX + radiusX * Math.cos((angle * Math.PI) / 180));
    const y = Math.round(centerY - radiusY * Math.sin((angle * Math.PI) / 180));

    // calculate the z-index depending on the index
    const layerCounts = arr.length / 2 + 1;
    const layer = index < layerCounts ? index + 1 : arr.length - index + 1;
    const zIndex = 10 * (layerCounts - layer);
    console.log("index -- zIndex: ", index, "--", zIndex);

    return { left: `${x}px`, top: `${y}px`, zIndex: 10 * zIndex };
  });
  console.log("positions: ", positions);

  const setBackGroundColors = () => {
    cardsRef.current[activeIndex].focus();
    // set background colors of all inputs depending on the active index
    cardsRef.current.forEach((ref, index) => {
      if (index === activeIndex) {
        ref.style.backgroundColor = "rgb(248, 250, 252)";
        ref.style.opacity = "1";
      } else {
        ref.style.backgroundColor = "rgb(148, 163, 184)";
        ref.style.opacity = "0.5";
      }
    });
  };

  const handleTransitionEnd = () => {
    setTimeout(() => {
      setBackGroundColors();
    }, 100);
  };

  useEffect(() => {
    setBackGroundColors();
  });

  const inputRefCallback = (ref, index) => {
    // Assign the ref to the current nodeRef
    cardsRef.current[index] = ref.current;
  };

  const cards = arr.map((item, index) => (
    <Card
      key={index}
      data={{ item }}
      cardsRef={cardsRef}
      inputRef={(ref) => inputRefCallback(ref, index)}
      index={index}
      positions={positions}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      handleTransitionEnd={handleTransitionEnd}
    />
  ));

  return (
    <div id="cards-wrapper" className="relative h-48 w-48">
      {cards}
    </div>
  );
};

export default React.memo(Carousel);

// import React, { useRef, useState } from "react";
// import "./App.css";

// function MyNode({ inputRef }) {
//   const myInputRef = useRef(null);

//   const onClick = () => {
//     myInputRef.current.focus();
//   };

//   // Call the inputRef function with the ref as an argument
//   inputRef(myInputRef);

//   return (
//     <div>
//       <button onClick={onClick}>Focus</button>
//       <input className="input" ref={myInputRef} />
//     </div>
//   );
// }

// function App() {
//   const nodesRef = useRef([]);

//   const addNode = () => {
//     nodesRef.current.push(React.createRef());
//     setNodes([...nodesRef.current]);
//   };

//   const inputRefCallback = (ref, index) => {
//     // Assign the ref to the current nodeRef
//     nodesRef.current[index] = ref;
//   };

//   const [nodes, setNodes] = useState([]);

//   return (
//     <div className="App">
//       <div className="App-wrapper">
//         <button className="create-node" onClick={addNode}>
//           Create Node
//         </button>
//         <div className="nodes-wrapper">
//           {nodes.map((_, index) => (
//             <MyNode key={index} inputRef={(ref) => inputRefCallback(ref, index)} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useRef, useState } from "react";
// import "./App.css";
// import MyNode from "./MyNode";

// function App() {
//   const nodesRef = useRef([]);
//   const [nodes, setNodes] = useState([]);
//   const addNode = () => {
//     setNodes([
//       ...nodes,
//       <MyNode
//         key={nodes.length}
//         inputRef={(elem) => (nodesRef.current[nodes.length] = elem)}
//       />,
//     ]);
//   };
//   return (
//     <div className="App">
//       <div className="App-wrapper">
//         <button className="create-node" onClick={addNode}>
//           Create Node
//         </button>
//         <div className="nodes-wrapper">{nodes}</div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useRef, useState } from "react";

// const Carousel = ({ arr = [1, 2, 3] }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const refs = [useRef(), useRef(), useRef()];
//   //   console.log(refs);

//   const positions = arr.map((item, index) => {
//     const totalInputs = 3;
//     const rotation = activeIndex * 120 - 60; // Rotation based on the active index
//     const angle = (270 + (index * 360) / totalInputs + rotation) % 360;
//     const radiusX = 100; // adjust this value for the desired distance from the center
//     const radiusY = 40; // adjust this value for the desired distance from the center
//     const centerX = 200; // adjust this value for the desired center x-coordinate
//     const centerY = 200; // adjust this value for the desired center y-coordinate

//     const x = centerX + radiusX * Math.cos((angle * Math.PI) / 180);
//     const y = centerY + radiusY * Math.sin((angle * Math.PI) / 180);

//     return { left: `${x}px`, top: `${y}px` };
//   });

//   //   console.log("positions:", positions);
//   //   console.log(arr, activeIndex, refs);

//   const handleKeyPress = (e) => {
//     if (e.key === "Tab" || e.key === "Enter") {
//       e.preventDefault();

//       setActiveIndex((prevIndex) => {
//         const newIndex = (prevIndex + 1) % 3;
//         refs[newIndex].current.focus();
//         return newIndex;
//       });
//     }
//   };

//   return (
//     <div className="relative h-48 w-48">
//       {arr.map((item, index) => (
//         <div
//           key={index}
//           className="absolute transition-all duration-500"
//           style={{
//             ...positions[positions.length - index - 1],
//             transition: "left 0.5s, top 0.5s", // Apply smooth transition
//           }}
//         >
//           <input
//             type="text"
//             ref={refs[index]}
//             className={`w-40 h-16 p-4 border rounded transition-colors ${
//               activeIndex === index ? "bg-slate-50" : "bg-slate-200"
//             } transition-opacity ${
//               activeIndex === index ? "opacity-100" : "opacity-80"
//             }`}
//             onKeyDown={handleKeyPress}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Carousel;

// import React, { useState } from "react";

// const Carousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const calculatePosition = (index) => {
//     const totalInputs = 3;
//     const angle = (index * 360) / totalInputs;
//     const radiusX = 150; // adjust this value for the desired distance from the center
//     const radiusY = 80; // adjust this value for the desired distance from the center
//     const centerX = 200; // adjust this value for the desired center x-coordinate
//     const centerY = 200; // adjust this value for the desired center y-coordinate

//     const x = centerX + radiusX * Math.cos((angle * Math.PI) / 180);
//     const y = centerY + radiusY * Math.sin((angle * Math.PI) / 180);

//     return { left: `${x}px`, top: `${y}px` };
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Tab" || e.key === "Enter") {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
//     }
//   };

//   return (
//     <div className="relative h-400 flex justify-center items-center">
//       {[0, 1, 2].map((index) => (
//         <div key={index} className="absolute" style={calculatePosition(index)}>
//           <input
//             type="text"
//             className={`w-40 h-16 p-4 border rounded ${
//               activeIndex === index ? "opacity-100" : "opacity-80"
//             }`}
//             onKeyDown={handleKeyPress}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Carousel;

// import React, { useEffect, useState } from "react";

// const Carousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleKeyPress = (e) => {
//     if (e.key === "Tab" || e.key === "Enter") {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
//     }
//   };

//   return (
//     <div className="relative h-48 flex justify-center items-center">
//       {[0, 1, 2].map((index) => (
//         <div
//           key={index}
//           className={`absolute transition-transform ease-in-out duration-500 transform rotate-${
//             120 * index
//           }deg`}
//         >
//           <input
//             type="text"
//             className={`w-40 h-16 p-4 border rounded ${
//               activeIndex === index ? "opacity-100" : "opacity-0"
//             }`}
//             onKeyDown={handleKeyPress}
//             tabIndex={activeIndex === index ? "0" : "-1"}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Carousel;

// import { Transition } from "@headlessui/react";
// import React, { useEffect, useState } from "react";

// const Carousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Use effect to automatically cycle through carousel items
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="relative overflow-hidden h-20">
//       {/* First Input */}
//       <Transition
//         show={activeIndex === 0}
//         enter="transition-transform ease-in-out duration-500"
//         enterFrom="transform translate-x-0"
//         enterTo="transform translate-x-0"
//         leave="transition-transform ease-in-out duration-500"
//         leaveFrom="transform translate-x-0"
//         leaveTo="transform -translate-x-full"
//       >
//         <input
//           type="text"
//           className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-16 p-4 border rounded"
//         />
//       </Transition>

//       {/* Second Input */}
//       <Transition
//         show={activeIndex === 1}
//         enter="transition-transform ease-in-out duration-500"
//         enterFrom="transform translate-x-full"
//         enterTo="transform translate-x-0"
//         leave="transition-transform ease-in-out duration-500"
//         leaveFrom="transform translate-x-0"
//         leaveTo="transform -translate-x-full"
//       >
//         <input
//           type="text"
//           className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-12 p-3 border rounded"
//         />
//       </Transition>

//       {/* Third Input */}
//       <Transition
//         show={activeIndex === 2}
//         enter="transition-transform ease-in-out duration-500"
//         enterFrom="transform -translate-x-full"
//         enterTo="transform translate-x-0"
//         leave="transition-transform ease-in-out duration-500"
//         leaveFrom="transform translate-x-0"
//         leaveTo="transform -translate-x-full"
//       >
//         <input
//           type="text"
//           className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-12 p-3 border rounded"
//         />
//       </Transition>
//     </div>
//   );
// };

// export default Carousel;
