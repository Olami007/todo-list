import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";
import React from "react";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id, complete) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

// async function handleDelete(id) {
//   await prisma.todo.delete({ where: { id } });
// }

const Home = async () => {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2x1">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <div className="flex justify-between items-center mb-4">
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
            {/* <HandleDelete id={todo.id} handleDelete={handleDelete} /> */}
          </div>
        ))}
      </ul>
    </>
  );
};

export default Home;
