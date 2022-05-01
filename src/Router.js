import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { NewDiary } from "./pages/NewDiary";
import { Diarys } from "./pages/Diarys";
import { Dashboard } from "./pages/Dashboard";
import { Wallet } from "./pages/Wallet";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";

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
          </>
        )}
        <Route path="*" element={<Login login={loginMethod} />} />
      </Routes>
      {authenticated && <Navbar fetchSettings={fetchSettings} />}
    </BrowserRouter>
  );
};
export default Router;
