import { ChangeEvent, useState } from "react";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../Redux/store";
import { updateTodoListStatus } from "../slices/todoSlice";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const todoListStatus = useSelector((state: Rootstate) => {
    return state.todo.todoListStatus;
  });

  const updateFilterStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateTodoListStatus(e.target.value));
  };

  return (
    <div className="flex justify-between py-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-300 rounded-md py-2 px-4 flex justify-center items-center gap-2"
      >
        Add Task <FaPlus />
      </button>
      <select
        value={todoListStatus}
        onChange={updateFilterStatus}
        id="status"
        className="bg-slate-300 rounded-md py-2 px-4 cursor-pointer"
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type="add"
      />
    </div>
  );
};

export default Header;
