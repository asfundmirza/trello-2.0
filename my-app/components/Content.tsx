"use client";
import { useBoardStore } from "@/store/BoardStore";
import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Content() {
  const getBoard = useBoardStore((state) => state.getBoard);
  useEffect(() => {
    getBoard();
  }, [getBoard]);
  return (
    <div>Hello</div>
    // <DragDropContext>
    //   <Droppable droppableId="content" direction="horizontal" type="column">
    //     {(provided) => <div>{/*render columns here*/}</div>}
    //   </Droppable>
    // </DragDropContext>
  );
}

export default Content;
