import styled from "@emotion/styled";
import { useState, useRef, useContext, createContext } from "react";

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
  box-sizing: border-box;
  padding: 30px 15px;
  background-color: white;
`;

const Header = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #008cba;
  margin: 1rem auto;
  text-align: center;
`;

const FilterItem = styled.div`
  padding: 1rem 2rem;
  border: ${(props) => (props.$active ? "1px solid salmon" : "")};
  color: black;
  &:hover {
    color: red;
  }
`;

const FilterContext = createContext(null);

const Filter = ({ filter_name }) => {
  const { filter, setFilter } = useContext(FilterContext);
  return (
    <FilterItem
      $active={filter_name === filter}
      onClick={() => {
        setFilter(filter_name);
      }}
    >
      {filter_name}
    </FilterItem>
  );
};

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
  return (
    <Container>
      <TodoListWrapper>
        <Header>Todo List in React</Header>
        <section>
          <input type="text" value={value} onChange={handleTodoChange} />
          <input type="button" value="addTodo" onClick={handleAddTodo} />
          <input type="button" value="deleteAll" onClick={handleDeleteAll} />
          {/* todo form */}
        </section>
        <section>
          <FilterContext.Provider value={{ filter, setFilter }}>
            <Filter filter_name="all" />
            <Filter filter_name="completed" />
            <Filter filter_name="uncompleted" />
          </FilterContext.Provider>
          {/* filter */}
        </section>
        <hr />
        <section>
          {todoList.length > 0 &&
            filteredTodoList().map(({ todo, id, isDone }) => (
              <section key={id}>
                <div>{todo}</div>
                <div>
                  <input
                    type="button"
                    value="刪除"
                    onClick={() => {
                      handleDeleteOne(id);
                    }}
                  />
                  <input
                    type="button"
                    value={isDone ? "未完成" : "已完成"}
                    onClick={() => {
                      handleTodoIsDone(id);
                    }}
                  />
                </div>
              </section>
            ))}
        </section>
      </TodoListWrapper>
    </Container>
  );
}

export default App;
