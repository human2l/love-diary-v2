import { Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import TodoListPaper from "../components/TodoListPaper";
const TodoListContainer = styled("div")({
  boxSizing: "border-box",
  height: "100%",
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: 56,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const dummyListData = [
  {
    id: "1",
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi totam accusantium aspernatur aliquam unde consequuntur velit dignissimos ab delectus earum?",
    done: false,
  },
  { id: "a2", name: "desc2", done: false },
  { id: "a3", name: "desc3", done: false },
  { id: "a4", name: "desc4", done: false },
  { id: "a5", name: "desc5", done: false },
  { id: "a6", name: "desc6", done: false },
  { id: "a7", name: "desc7", done: false },
  { id: "a8", name: "desc8", done: false },
  { id: "a9", name: "desc8", done: false },
  { id: "a10", name: "desc8", done: false },
  { id: "a11", name: "desc8", done: false },
  { id: "a12", name: "desc8", done: false },
  { id: "a13", name: "desc8", done: false },
  { id: "a14", name: "desc8", done: false },
  { id: "a15", name: "desc8", done: false },
  { id: "a16", name: "desc8", done: false },
  { id: "a17", name: "desc17", done: false },
  { id: "a18", name: "desc18", done: false },
  { id: "a19", name: "desc19", done: false },
  { id: "a20", name: "desc20", done: false },
];

const TodoList = () => {
  const [todoArray, setTodoArray] = useState(dummyListData);

  const handleCheck = (checkedTodo) => {
    const newTodoArray = [...todoArray];
    newTodoArray.filter((todo) => todo.id === checkedTodo.id)[0].done = true;
    setTodoArray(newTodoArray);
  };

  return (
    <TodoListContainer>
      <Typography>asdfasdf</Typography>
      <Button>add new todo</Button>
      <TodoListPaper
        todoArray={todoArray}
        doneStatus={false}
        handleCheck={handleCheck}
      />

      <Typography>asdfasdf</Typography>

      <TodoListPaper todoArray={todoArray} doneStatus={true} />
    </TodoListContainer>
  );
};
export default TodoList;
