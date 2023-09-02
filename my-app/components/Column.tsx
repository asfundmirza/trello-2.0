import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const keyValues: {
  [key in TypedColumn]: string;
} = {
  todo: "Todo",
  inProgress: "In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  const [searchString] = useBoardStore((state) => [state.searchString]);
  const openModal = useModalStore((state) => state.openModal);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex font-bold justify-between items-center">
                  {keyValues[id]}
                  <span className="text-gray-500 bg-gray-100 rounded-full font-normal p-2">
                    {!searchString
                      ? todos.length
                      : todos.filter((todos) =>
                          todos.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;
                    return (
                      <Draggable
                        draggableId={todo.$id}
                        key={todo.$id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TodoCard
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                            innerRef={provided.innerRef}
                            todo={todo}
                            index={index}
                            snapshot={snapshot}
                            id={id}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button
                      onClick={openModal}
                      className="text-green-500 hover:text-green-700"
                    >
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
