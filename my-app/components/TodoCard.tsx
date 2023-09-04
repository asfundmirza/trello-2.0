import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);
  return (
    <div
      className="bg-white rounded-md drop-shadow-md space-y-2 mt-2"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-3">
          <p>{todo.title}</p>
          <button
            onClick={() => deleteTask(index, todo, id)}
            className="text-red-400 hover:text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        {imageUrl && (
          <div className="h-full w-full rounded-b-md">
            <Image
              src={imageUrl}
              alt="Task image"
              width={400}
              height={200}
              className="w-full object-contain rounded-b-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
