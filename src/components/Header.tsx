import { useState } from "react";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-between py-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-300 rounded-md py-2 px-4 flex justify-center items-center gap-2"
      >
        Add Task <FaPlus />
      </button>
      <select
        name=""
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
