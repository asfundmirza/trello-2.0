"use client";
import { useBoardStore } from "@/store/BoardStore";
import React, { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Column from "./Column";

function Content() {
  const [getBoard, board, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.getBoard,
      state.board,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );
  useEffect(() => {
    getBoard();
    console.log(board);
  }, [getBoard]);
  const dndHandler = (result: DropResult) => {
    const { destination, source, type } = result;
    //check user drag card out of the board
    if (!destination) {
      return;
    }
    //logic for column to drag and drop
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangeColumn = new Map(entries);
      setBoardState({ ...board, columns: rearrangeColumn });
    }
    //logic for card to drag and drop

    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const endColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todo: startColIndex[1].todo,
    };
    const endCol: Column = {
      id: endColIndex[0],
      todo: endColIndex[1].todo,
    };
    if (!startCol || !endCol) return;
    //if drag and drop on the same position then do nothing
    if (source.index === destination.index && startCol === endCol) return;

    const newTodos = startCol.todo;
    const [todoMoved] = newTodos.splice(source.index, 1);
    if (startCol.id === endCol.id) {
      //Same column task drag and drop
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todo: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      //Different column task drag and drop
      const finishTodos = Array.from(endCol.todo);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todo: newTodos,
      };
      newColumns.set(startCol.id, newCol);
      newColumns.set(endCol.id, {
        id: endCol.id,
        todo: finishTodos,
      });
      //update in DB
      updateTodoInDB(todoMoved, endCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };
  return (
    <DragDropContext onDragEnd={dndHandler}>
      <Droppable droppableId="content" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto max-w-7xl px-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todo} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Content;
