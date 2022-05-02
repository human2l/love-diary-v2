import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Diarys from "./pages/Diarys";
import Login from "./pages/Login";
import NewDiary from "./pages/NewDiary";
import Settings from "./pages/Settings";
import TodoList from "./pages/TodoList";
import Wallet from "./pages/Wallet";

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
