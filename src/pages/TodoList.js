import { styled, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

const TodoListContainer = styled("div")({
  boxSizing: "border-box",
  height: "100%",
  width: "100%",
  paddingBottom: 56,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const dummyListData = [
  { id: "11", name: "desc1", done: false },
  { id: "22", name: "desc2", done: false },
  { id: "33", name: "desc3", done: false },
  { id: "44", name: "desc4", done: false },
  { id: "55", name: "desc5", done: false },
  { id: "66", name: "desc6", done: false },
  { id: "77", name: "desc7", done: false },
  { id: "88", name: "desc8", done: false },
];

const TodoList = () => {
  const [checkList, setCheckList] = useState(dummyListData);

  const handleToggle = (id) => {
    const currentTodoIndex = checkList.findIndex((todo) => {
      return todo.id === id;
    });
    const newCheckList = [...checkList];
    newCheckList[currentTodoIndex].done = !newCheckList[currentTodoIndex].done;
    console.log(newCheckList);
    setCheckList(newCheckList);
  };

  return (
    <TodoListContainer>
      <Typography>asdfasdf</Typography>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {checkList.map(({ id, name, done }) => {
          const labelId = `checkbox-list-label-${id}`;

          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={done}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </TodoListContainer>
  );
};
export default TodoList;
