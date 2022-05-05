import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { settingsContext } from "../app";

const ChipContainer = styled("div")({
  maxWidth: "100%",
  padding: 2,
});

const Label = styled("div")({
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TodoListPaper = ({ todosArray, doneStatus, handleCheck }) => {
  const { user } = useContext(settingsContext);
  const { t } = useTranslation();
  const checkedChips = () => {
    const checkedArray = todosArray.find((todo) => todo.done === doneStatus);

    if (!checkedArray) return <div>{t("empty.label")}</div>;
    return checkedArray.map((todo) => {
      return (
        <ChipContainer key={`checked-todo-${todo.id}`}>
          <Chip
            size="medium"
            label={<Label>{todo.name}</Label>}
            deleteIcon={
              !doneStatus && user === todo.user ? <CheckCircleIcon /> : null
            }
            onDelete={
              !doneStatus && user === todo.user ? () => handleCheck(todo) : null
            }
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
