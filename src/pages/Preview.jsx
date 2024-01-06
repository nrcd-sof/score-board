import React, { useRef, useState } from "react";

const PlayerList = ({ players }) => {
  const [data, setData] = useState(players);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, id) => {
    dragItem.current = id;
  };

  const dragEnter = (e, id) => {
    e.preventDefault();
    dragOverItem.current = id;
    setIsDraggedOver(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };
  const drop = (e, id) => {
    e.preventDefault();

    // Update the order only if the drop target is different from the source
    if (dragItem.current !== id) {
      const copyListItems = [...data];
      const dragItemIndex = copyListItems.findIndex(
        (item) => item.id === dragItem.current
      );
      const dropItemIndex = copyListItems.findIndex((item) => item.id === id);

      const [draggedItem] = copyListItems.splice(dragItemIndex, 1);
      copyListItems.splice(dropItemIndex, 0, draggedItem);

      setData(copyListItems);
    }

    // Reset refs
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Player List</h1>
      <ul className="w-full max-w-md border rounded overflow-hidden shadow-lg">
        {data.map((player) => (
          <li
            key={player.id}
            id={player.id}
            draggable
            onDragStart={(e) => dragStart(e, player.id)}
            onDragEnter={(e) => dragEnter(e, player.id)}
            onDragLeave={(e) => dragLeave(e)}
            onDragOver={allowDrop}
            onDrop={(e) => drop(e, player.id)}
            className={`border-b p-4 ${isDraggedOver ? "bg-gray-600" : ""}`}
          >
            <span className="text-lg font-bold">{player.name}</span>
            <span className="text-gray-500 ml-2">Order: {player.order}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PlayerListContainer = () => {
  const players = [
    { id: 0, name: "Player A", order: 1 },
    { id: 1, name: "Player B", order: 2 },
    { id: 2, name: "Player C", order: 3 },
    { id: 3, name: "Player D", order: 4 },
  ];

  return <PlayerList players={players} />;
};

export default PlayerListContainer;

// import React, { useRef, useState } from "react";

// const PlayerList = ({ players }) => {
//   const [data, setData] = useState(players);
//   const dragItem = useRef();
//   const dragOverItem = useRef();
//   const dragStart = (e) => {
//     dragItem.current = e.target.id;
//   };
//   const dragEnter = (e) => {
//     // console.log("drag enter", e.target);
//     dragOverItem.current = e.target.id;
//   };
//   const drop = () => {
//     console.log("drop: ", dragItem.current, dragOverItem.current);
//     const copyListItems = [...data];
//     const dragItemContent = copyListItems[dragItem.current];
//     copyListItems.splice(dragItem.current, 1);
//     copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//     console.log("drop", copyListItems);
//     dragItem.current = null;
//     dragOverItem.current = null;
//     setData(copyListItems);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-3xl font-bold mb-4">Player List</h1>
//       <ul className="w-full max-w-md border rounded overflow-hidden shadow-lg">
//         {data.map((player) => (
//           <li
//             id={player.id}
//             draggable
//             onDragStart={(e) => dragStart(e)}
//             onDragEnter={(e) => dragEnter(e)}
//             onDragEnd={drop}
//             key={player.id}
//             className="border-b p-4"
//           >
//             <span className="text-lg font-bold">{player.name}</span>
//             <span className="text-gray-500 ml-2">Order: {player.order}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const PlayerListContainer = () => {
//   // Array of players specific to the PlayerListContainer
//   const players = [
//     { id: 0, name: "Player A", order: 1 },
//     { id: 1, name: "Player B", order: 2 },
//     { id: 2, name: "Player C", order: 3 },
//     { id: 3, name: "Player D", order: 4 },
//   ];

//   return <PlayerList players={players} />;
// };

// export default PlayerListContainer;

// import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// const PlayerList = ({ players, onDragEnd }) => {
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="playerList" direction="vertical">
//         {(provided) => (
//           <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-3xl font-bold mb-4">Player List</h1>
//             <ul
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="w-full max-w-md border rounded overflow-hidden shadow-lg"
//             >
//               {players.map((player, index) => (
//                 <Draggable
//                   key={player.id}
//                   draggableId={`player-${player.id}`}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <li
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       key={player.id}
//                       className="border-b p-4"
//                     >
//                       <span className="text-lg font-bold">{player.name}</span>
//                       <span className="text-gray-500 ml-2">
//                         Order: {player.order}
//                       </span>
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// const PlayerListContainer = () => {
//   const [players, setPlayers] = useState([
//     { id: 0, name: "Player A", order: 1 },
//     { id: 1, name: "Player B", order: 2 },
//     { id: 2, name: "Player C", order: 3 },
//     { id: 3, name: "Player D", order: 4 },
//   ]);

//   const onDragEnd = (result) => {
//     console.log(result);
//     return;
//     // If the destination is not valid, return early
//     if (!result.destination) {
//       return;
//     }

//     const updatedPlayers = Array.from(players);
//     const [movedPlayer] = updatedPlayers.splice(result.source.index, 1);
//     updatedPlayers.splice(result.destination.index, 0, movedPlayer);

//     // Update the order property based on the new order
//     updatedPlayers.forEach((player, index) => {
//       player.order = index + 1;
//     });

//     setPlayers(updatedPlayers);
//   };

//   return <PlayerList players={players} onDragEnd={onDragEnd} />;
// };

// export default PlayerListContainer;
