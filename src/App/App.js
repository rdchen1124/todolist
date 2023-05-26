import styled from "@emotion/styled";
import { useState, useRef } from "react";

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
      todoList.filter((todo) => todo.isDone === true);
    }
    if (filter === "uncompleted") {
      todoList.filter((todo) => todo.isDone === false);
    }
    return todoList;
  };
  return (
    <Container>
      <TodoListWrapper>
        <header>
          <h1>Todo List in React</h1>
        </header>
        <section>
          <input type="text" value={value} onChange={handleTodoChange} />
          <input type="button" value="addTodo" onClick={handleAddTodo} />
          <input type="button" value="deleteAll" onClick={handleDeleteAll} />
          {/* todo form */}
        </section>
        <section>
          <div>all</div>
          <div>completed</div>
          <div>uncompleted</div>
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
