import { databases } from "@/appwrite";

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );
  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todo: [],
      });
    }
    acc.get(todo.status)!.todo.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });
    return acc;
  }, new Map<TypedColumn, Column>());

  const columntypes: TypedColumn[] = ["todo", "inProgress", "done"];
  for (const columntype of columntypes) {
    if (!columns.get(columntype)) {
      columns.set(columntype, {
        id: columntype,
        todo: [],
      });
    }
  }
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columntypes.indexOf(a[0]) - columntypes.indexOf(b[0])
    )
  );
  const board: Board = {
    columns: sortedColumns,
  };
  return board;
};
