import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <h1 className="text-center text-5xl my-5 uppercase">Todo-App</h1>
      <div className="w-[100%] max-w-[750px] my-0 mx-auto p-4">
        <Header />
        <TodoList />
      </div>
    </>
  );
}

export default App;
