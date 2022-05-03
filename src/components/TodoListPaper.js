import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import { settingsContext } from "../App";

const ChipContainer = styled("div")({
  maxWidth: "100%",
  padding: 2,
});

const Label = styled("div")({
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TodoListPaper = ({ todoArray, doneStatus, handleCheck }) => {
  const { user } = useContext(settingsContext);

  const checkedChips = () => {
    const checkedArray = todoArray.filter((todo) => todo.done === doneStatus);
    if (!checkedArray.length) return <div>empty</div>;
    return checkedArray.map((todo) => {
      return (
        <ChipContainer key={`checked-todo-${todo.id}`}>
          <Chip
            size="small"
            label={<Label>{todo.name}</Label>}
            deleteIcon={!doneStatus ? <CheckCircleIcon /> : null}
            onDelete={!doneStatus ? () => handleCheck(todo) : null}
            color={todo.user === user ? "primary" : "secondary"}
            style={{
              maxWidth: "100%",
            }}
          />
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
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
    >
      <Stack
        direction="row"
        spacing={0}
        sx={{ flexWrap: "wrap", width: "100%" }}
      >
        {checkedChips()}
      </Stack>
    </Paper>
  );
};
export default TodoListPaper;
