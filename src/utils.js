const TODOLIST = "TodoList";
export const getTodoApp = () => {
  let data = window.localStorage.getItem(TODOLIST);
  if (data === null) {
    data = [];
  }
  return data;
};
export const setTodoApp = (todoList) => {
  window.localStorage.setItem(TODOLIST, JSON.stringify(todoList));
};
