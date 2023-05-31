import styled from "@emotion/styled";
import { useState, useRef, useContext, createContext } from "react";
const theme = {
  color_blue: "#008cba",
  color_red: "#f44336",
  color_gray: "rgba(0, 0, 0, 0.3)",
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
  color: ${theme.color_blue};
  margin: 1rem auto;
  text-align: center;
`;

const TodoForm = styled.div`
  padding: 1rem;
  display: inline-flex;
`;

const TodoFormInput = styled.input`
  font-size: 1.2rem;
  padding: 0.3rem 0.6rem;
  margin-right: 1rem;
  display: inline-flex;
`;

const CompleteButton = styled.button`
  background-color: ${(props) =>
    props.isDone ? `${theme.color_gray}` : `${theme.color_blue}`};
  padding: 0.3rem 0.6rem;
  display: inline-block;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
`;

const DeleteButton = styled(CompleteButton)`
  margin-left: 10px;
  background-color: ${theme.color_red};
`;

const OutlineAddButton = styled(CompleteButton)`
  background-color: white;
  color: black;
  border: 1px solid ${theme.color_blue};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${theme.color_blue};
    color: white;
  }
`;

const OutlineDeleteButton = styled(OutlineAddButton)`
  margin-left: 10px;
  border: 1px solid ${theme.color_red};
  &:hover {
    background-color: ${theme.color_red};
  }
`;

const FilterWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterItem = styled.div`
  padding: 0.5rem 1rem;
  border: ${(props) =>
    props.$active ? "1px solid salmon" : "1px solid white"};
  color: black;
  margin-left: 10px;
  &:hover {
    color: red;
  }
`;
const TodoItemsWrapper = styled.div`
  margin: 0 auto;
  height: 35vh;
  overflow-y: auto;
`;

const TodoItem = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 0.5rem;
  }
`;

const TodoContent = styled.div`
  font-size: 1.2rem;
  color: ${(props) => (props.isDone ? "gray" : "black")};
  ${(props) => props.isDone && "text-decoration: line-through;"}
`;

const TodoButtons = styled.div``;

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
        <TodoForm>
          <TodoFormInput
            type="text"
            value={value}
            onChange={handleTodoChange}
          />
          <OutlineAddButton onClick={handleAddTodo}>addTodo</OutlineAddButton>
          <OutlineDeleteButton onClick={handleDeleteAll}>
            deleteAll
          </OutlineDeleteButton>
          {/* todo form */}
        </TodoForm>
        <FilterWrapper>
          <FilterContext.Provider value={{ filter, setFilter }}>
            <Filter filter_name="all" />
            <Filter filter_name="completed" />
            <Filter filter_name="uncompleted" />
          </FilterContext.Provider>
          {/* filter */}
        </FilterWrapper>
        <hr />
        <TodoItemsWrapper>
          {todoList.length > 0 &&
            filteredTodoList().map(({ todo, id, isDone }) => (
              <TodoItem key={id}>
                <TodoContent isDone={isDone}>{todo}</TodoContent>
                <TodoButtons>
                  <CompleteButton
                    isDone={isDone}
                    onClick={() => {
                      handleTodoIsDone(id);
                    }}
                  >
                    {isDone ? "未完成" : "已完成"}
                  </CompleteButton>
                  <DeleteButton
                    onClick={() => {
                      handleDeleteOne(id);
                    }}
                  >
                    刪除
                  </DeleteButton>
                </TodoButtons>
              </TodoItem>
            ))}
        </TodoItemsWrapper>
      </TodoListWrapper>
    </Container>
  );
}

export default App;
