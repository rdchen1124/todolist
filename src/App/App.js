import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { useState, useRef, createContext, useEffect } from "react";
import { getTodoApp, setTodoApp } from "../utils";
import FilterGroup from "../FilterGroup";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

const theme = {
  colors: {
    primary: "#008cba",
    danger: "#f44336",
    secondary: "rgba(0, 0, 0, 0.3)",
    warning: "#ffc20052",
    dark: "black",
    light: "white",
  },
};

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoListWrapper = styled.div`
  position: relative;
  min-width: 360px;
  max-height: 60vh;
  box-sizing: border-box;
  padding: 20px 15px;
  background-color: white;
`;

const Header = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 1rem auto;
  text-align: center;
`;

const FilterContext = createContext(null);

function App() {
  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("all");
  const id = useRef(1);
  const handleTodoChange = (e) => {
    setValue(e.target.value);
  };
  const handleAddTodo = () => {
    if (value !== "") {
      setTodoList([
        { todo: value, id: id.current, isDone: false },
        ...todoList,
      ]);
      setValue("");
      id.current++;
    }
  };
  const handleDeleteAll = () => {
    //清除 todoList 為 [], 並且重置 id 為 1
    if (todoList.length > 0) {
      setTodoList([]);
      id.current = 1;
    }
  };
  const handleDeleteOne = (todoID) => {
    if (todoList.length === 1 && todoID === todoList[0].id) {
      //若刪除後 todoList 為 [], 希望把 id.current 清為 1
      setTodoList([]);
      id.current = 1;
    } else {
      //刪除 todoList 裡對應 id 的 todo 項目
      setTodoList(todoList.filter((todo) => todoID !== todo.id));
    }
  };
  const handleTodoIsDone = (todoID) => {
    //反轉 todoList 裡 id 對應 的 todo 項目的 isDone 變數
    setTodoList(
      todoList.filter((todo) => {
        if (todo.id === todoID) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      })
    );
  };
  const filteredTodoList = () => {
    if (filter === "completed") {
      return todoList.filter((todo) => todo.isDone === true);
    } else if (filter === "uncompleted") {
      return todoList.filter((todo) => todo.isDone === false);
    } else {
      return todoList;
    }
  };
  useEffect(() => {
    let data = JSON.parse(getTodoApp());
    if (data.length > 0) {
      id.current = data[0].id + 1;
    }
    setTodoList(data);
  }, []);

  useEffect(() => {
    setTodoApp(todoList);
  }, [todoList]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TodoListWrapper>
          <Header>Todo List in React</Header>
          {/* todo form */}
          <TodoForm
            todo={value}
            onTodoChange={handleTodoChange}
            onAddTodo={handleAddTodo}
            onDeleteAll={handleDeleteAll}
          />
          {/* filter */}
          <FilterContext.Provider value={{ filter, setFilter }}>
            <FilterGroup />
          </FilterContext.Provider>
          <hr />
          {/* todo List */}
          <TodoList
            todoList={filteredTodoList()}
            onTodoIsDone={handleTodoIsDone}
            onDeleteTodo={handleDeleteOne}
          />
        </TodoListWrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
export { FilterContext };
