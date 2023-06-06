import styled from "@emotion/styled";
import { OutlineAddButton, OutlineDeleteButton } from "../Buttons";
const TodoFormWrapper = styled.div`
  padding: 1rem;
  display: inline-flex;
`;
const TodoFormInput = styled.input`
  font-size: 1.2rem;
  padding: 0.3rem 0.6rem;
  margin-right: 1rem;
  display: inline-flex;
`;
function TodoForm({ todo, onTodoChange, onAddTodo, onDeleteAll }) {
  return (
    <TodoFormWrapper>
      <TodoFormInput
        type="text"
        placeholder="new todo..."
        value={todo}
        onChange={onTodoChange}
      />
      <OutlineAddButton onClick={onAddTodo}>addTodo</OutlineAddButton>
      <OutlineDeleteButton onClick={onDeleteAll}>deleteAll</OutlineDeleteButton>
    </TodoFormWrapper>
  );
}
export default TodoForm;
