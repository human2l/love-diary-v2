import { Button, styled, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import TodoListPaper from "../components/TodoListPaper";
import { getAllTodos, updateTodo } from "../services/airtable";

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

const TodoList = () => {
  // const [todoArray, setTodoArray] = useState(dummyListData);
  const queryClient = useQueryClient();

  const fetchAllTodos = getAllTodos;
  const {
    isLoading,
    isFetching,
    data: todoArray,
    isError,
    error,
  } = useQuery("fetchAllTodos", fetchAllTodos);

  const handleCheck = useMutation((todo) => {
    todo.done = true;
    updateTodo(todo, () => {
      queryClient.invalidateQueries("fetchAllTodos");
    });
  });

  return (
    <>
      <TodoListContainer>
        {isLoading ? (
          <img src={loadingHeartsSvg} alt="loading" />
        ) : (
          <>
            <Typography>asdfasdf</Typography>
            <Button>add new todo</Button>
            <TodoListPaper
              todoArray={todoArray}
              doneStatus={false}
              handleCheck={handleCheck.mutate}
            />

            <Typography>asdfasdf</Typography>

            <TodoListPaper todoArray={todoArray} doneStatus={true} />
          </>
        )}
      </TodoListContainer>
    </>
  );
};
export default TodoList;
