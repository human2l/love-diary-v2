import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import Diarys from "./pages/diarys";
import Login from "./pages/login";
import NewDiary from "./pages/newDiary";
import Settings from "./pages/settings";
import TodoList from "./pages/todoList";
import Wallet from "./pages/wallet";

const Router = (props) => {
  const { authenticated, loginMethod, fetchSettings } = props;

  return (
    <BrowserRouter>
      <Routes>
        {authenticated && (
          <>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/new_diary" element={<NewDiary />} />
            <Route path="/diarys" element={<Diarys />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/toDoList" element={<TodoList />} />
          </>
        )}
        <Route path="*" element={<Login login={loginMethod} />} />
      </Routes>
      {authenticated && <Navbar fetchSettings={fetchSettings} />}
    </BrowserRouter>
  );
};
export default Router;