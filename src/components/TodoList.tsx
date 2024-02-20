import Todo from "./Todo";
import { Rootstate } from "../Redux/store";
import { useSelector } from "react-redux";

// import { selectTodoList } from "../slices/todoSlice";

export type todoInfo = {
  id: string;
  text: string;
  completed: boolean;
  formattedTime: string;
  formattedDate: string;
};

const TodoList = () => {
  // const [todoList, setTodoList] = useState<todoInfo[]>([
  //   {
  //     id: "1",
  //     text: "Learn Reactjs",
  //     status: "incomplete",
  //     formattedTime: new Date().toLocaleTimeString(undefined, {
  //       hour: "numeric",
  //       minute: "numeric",
  //     }),
  //     formattedDate: new Date().toLocaleDateString(undefined, {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //     }),
  //   },
  // ]);

  const todoListStatus = useSelector((state: Rootstate) => {
    return state.todo.todoListStatus;
  });
  const todos = useSelector((state: Rootstate) => {
    return state.todo.todoList;
  });

  const filteredTodoList = todos.filter((todo) => {
    if (todoListStatus === "all") {
      return true;
    } else if (todoListStatus === "incomplete") {
      return !todo.completed;
    } else if (todoListStatus === "completed") {
      return todo.completed;
    }
  });

  return (
    <div className="p-4 bg-slate-200 flex flex-col gap-4 rounded-md">
      {filteredTodoList.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
