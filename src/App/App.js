import styled from "@emotion/styled";
import { useState } from "react";

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
  const handleTodoChange = (todo) => {
    setValue(todo);
  };
  return (
    <Container>
      <TodoListWrapper>
        <header>
          <h1>Todo List in React</h1>
        </header>
        <section>
          <input
            type="text"
            onChange={(e) => {
              handleTodoChange(e.target.value);
            }}
          />
          <input type="button" value="addTodo" />
          {/* todo form */}
        </section>
        <section>{/* filter */}</section>
        <hr />
        <section>{/* todo items */}</section>
      </TodoListWrapper>
    </Container>
  );
}

export default App;
