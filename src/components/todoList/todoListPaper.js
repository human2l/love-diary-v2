import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Chip from "@mui/material/Chip";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { settingsContext } from "../../app";

const ChipContainer = styled("div")({
  maxWidth: "100%",
  padding: 2,
});

const Label = styled("div")({
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TodoListPaper = ({ todosArray, doneStatus, handleTodo }) => {
  const { t, user } = useContext(settingsContext);

  const checkedChips = () => {
    const checkedArray = todosArray.filter((todo) => todo.done === doneStatus);

    if (!checkedArray.length) return <div>{t("empty.label")}</div>;
    return checkedArray.map((todo, index) => {
      let deleteIcon = null;
      let onDelete = null;
      if (user === todo.user) {
        deleteIcon = !doneStatus ? <CheckCircleIcon /> : <CancelIcon />;
        onDelete = () => {
          todo.done = !doneStatus;
          handleTodo(todo);
        };
      }
      return (
        <ChipContainer key={`checked-todo-${todo.id}`}>
          <Grow in timeout={400 * index} onExit={() => console.log("a")}>
            <Chip
              size="medium"
              label={<Label>{todo.name}</Label>}
              deleteIcon={deleteIcon}
              onDelete={onDelete}
              color={todo.user === user ? "primary" : "secondary"}
              style={{
                maxWidth: "100%",
              }}
            />
          </Grow>
        </ChipContainer>
      );
    });
  };

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 1,
        backgroundColor: "rgba(255,255,255, 0.5)",
      }}
    >
      <Stack
        direction="row"
        spacing={0}
        sx={{
          flexWrap: "wrap",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {checkedChips()}
      </Stack>
    </Paper>
  );
};
export default TodoListPaper;
