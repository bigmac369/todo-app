import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { todoInfo } from "./TodoList";
import { deleteTodo, toggleComplete } from "../slices/todoSlice";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { useState } from "react";

type todoProps = { todo: todoInfo };

const Todo = ({ todo }: todoProps) => {
  const dispatch = useDispatch();

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleToggle = () => {
    dispatch(toggleComplete(todo.id));
  };

  return (
    <>
      <div
        className="flex justify-between bg-white px-4 py-2 rounded-md text-sm
    "
      >
        <div className="flex justify-center items-center gap-4">
          <div className="flex">
            <input
              type="checkbox"
              checked={todo.completed}
              className="w-8 h-8 cursor-pointer"
              onChange={handleToggle}
            />
          </div>

          <div className="flex flex-col">
            <p className={`break-all ${todo.completed ? "line-through" : ""}`}>
              {todo.text}
            </p>
            <p className="shrink-0">
              {todo.formattedTime}, {todo.formattedDate}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="cursor-pointer">
            <MdEdit size={30} onClick={handleUpdate} />
          </div>
          <div className="cursor-pointer text-red-500 rounded-md">
            <MdDelete size={30} onClick={handleDeleteTodo} />
          </div>
        </div>
      </div>

      <Modal
        isModalOpen={updateModalOpen}
        setIsModalOpen={setUpdateModalOpen}
        type="update"
        todo={todo}
      />
    </>
  );
};

export default Todo;
