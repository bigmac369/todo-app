import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { todoInfo } from "./TodoList";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  todo?: todoInfo;
};

const Modal = ({ isModalOpen, setIsModalOpen, type = "add", todo }: Props) => {
  const [text, setText] = useState(todo?.text || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setText(todo?.text || "");
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen === true) {
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text && text.trim() !== "") {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuidv4(),
            text: text,
            status: "incomplete",
            formattedTime: new Date().toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "numeric",
            }),
            formattedDate: new Date().toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
          })
        );
        setIsModalOpen(false);
        setText("");
      }
      if (type === "update" && todo?.text) {
        // console.log("updating task");
        // console.log(todo?.text);
        dispatch(updateTodo({ ...todo, text }));
        setIsModalOpen(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    isModalOpen && (
      <div className="wrapper fixed top-0 left-0 w-[100%] h-[100%] z-[1000] bg-black/50 flex justify-center items-center">
        <div className="container flex justify-center items-center bg-[#ecedf6] w-[90%] max-w-[500px] p-8 absolute">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-0 cursor-pointer m-1 bg-red-500 rounded"
          >
            <IoMdClose size={30} />
          </div>

          <form
            className="w-[100%]"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label htmlFor="title">
              {type === "add" ? "Add" : "Update"} Task
              <input
                ref={inputRef}
                type="text"
                id="title"
                className="w-[100%] mt-2 mb-8 p-4"
                onChange={handleChange}
                value={text}
              />
            </label>
            <button
              type="submit"
              className="bg-blue-300 rounded-md py-2 px-4 flex justify-center items-center gap-2"
            >
              {type === "add" ? "Add" : "Update"} Task
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
