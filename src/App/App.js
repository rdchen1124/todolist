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
  const id = useRef(1);
  const handleTodoChange = (e) => {
    setValue(e.target.value);
  };
  const handleAddTodo = () => {
    if (value !== "") {
      setTodoList([{ todo: value, id: id.current }, ...todoList]);
      setValue("");
      id.current++;
    }
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
          {/* todo form */}
        </section>
        <section>{/* filter */}</section>
        <hr />
        <section>
          {todoList.length > 0 &&
            todoList.map(({ todo, id }) => <div key={id}>{todo}</div>)}
        </section>
      </TodoListWrapper>
    </Container>
  );
}

export default App;
