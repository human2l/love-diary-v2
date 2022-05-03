// import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import { Button } from "@mui/material";

import { styled } from "@mui/material";

const TodoListHistoryContainer = styled("div")({
  boxSizing: "border-box",
  marginLeft: 10,
  marginRight: 10,
  paddingBottom: 65,
  // maxWidth: 500,
  display: "flex",
  flexDirection: "column",
});

const TodoListHistory = () => {
  //   let navigate = useNavigate();
  return (
    <TodoListHistoryContainer></TodoListHistoryContainer>
    // <Button
    //   color="primary"
    //   variant="contained"
    //   onClick={() => {
    //     navigate("/todoList");
    //   }}
    //   size="large"
    //   startIcon={<ArrowBackOutlinedIcon />}
    // >
    //   返回
    // </Button>
  );
};
export default TodoListHistory;
