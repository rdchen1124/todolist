import styled from "@emotion/styled";
import { CompleteButton, DeleteButton } from "../Buttons";

const theme = {
  color_blue: "#008cba",
  color_red: "#f44336",
  color_gray: "rgba(0, 0, 0, 0.3)",
  color_orange: "#ffc20052",
};

const TodoListWrapper = styled.div`
  margin: 0 auto;
  height: 35vh;
  overflow-y: auto;
`;

const TodoItem = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 0.5rem;
  }
  transition: all 0.2s ease;
  &:hover {
    background: ${theme.color_orange};
  }
`;

const TodoContent = styled.div`
  font-size: 1.2rem;
  color: ${(props) => (props.isDone ? "gray" : "black")};
  ${(props) => props.isDone && "text-decoration: line-through;"}
`;

const TodoButtons = styled.div``;

const TodoList = ({ todoList, onTodoIsDone, onDeleteTodo }) => {
  return (
    <TodoListWrapper>
      {todoList.length > 0 &&
        todoList.map(({ todo, id, isDone }) => (
          <TodoItem key={id}>
            <TodoContent isDone={isDone}>{todo}</TodoContent>
            <TodoButtons>
              <CompleteButton
                isDone={isDone}
                onClick={() => {
                  onTodoIsDone(id);
                }}
              >
                {isDone ? "未完成" : "已完成"}
              </CompleteButton>
              <DeleteButton
                onClick={() => {
                  onDeleteTodo(id);
                }}
              >
                刪除
              </DeleteButton>
            </TodoButtons>
          </TodoItem>
        ))}
    </TodoListWrapper>
  );
};

export default TodoList;
