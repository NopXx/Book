import "./App.css";
import Navber from "./components/Navber";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import History from "./components/History";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BookDetail from "./components/BookDetail";
import Login from "./components/Login";
import axios from "axios";
import { useLocalStorage } from "./hook/useLocalStorage";
import AHome from "./components/admin/AHome";
import ALogin from "./components/admin/ALogin";
import ANavber from "./components/admin/ANavber";
import AProfile from "./components/admin/AProfile";
import AList from "./components/admin/AList";
import ABook from "./components/admin/ABook";
import AUser from "./components/admin/AUser";
import UserDetall from "./components/page/UserDetall";
import StaffDetall from "./components/page/StaffDetall";
import AAddUser from "./components/admin/AAddUser";

function App() {
  axios.defaults.withCredentials = true;
  const [Theme, setTheme] = useLocalStorage("theme", "");
  const [showMenu, setShowMenu] = useState(false);
  const [isloggedIN, setIsloggedIn] = useLocalStorage("login", "");
  const [isloginA, setIsloginA] = useLocalStorage("loginA", "");
  const [userdata, setUserdata] = useState([]);

  const isCookie = () => {
    axios.get("http://localhost:3001/login").then((result) => {
      setUserdata(result.data.user);
      setIsloggedIn(result.data.loggedIN);
    });
  };
  useEffect(() => {
    isCookie();
  }, []);

  console.log("loggenIN : " + isloggedIN);

  return (
    <Router>
      <div className="container mx-auto">
        <Helmet>
          <html data-theme={Theme} />
        </Helmet>
        {isloginA === true ? (
          <ANavber
            themedata={Theme}
            setMode={setTheme}
            Menu={showMenu}
            isLogin={isloggedIN}
            setLogin={setIsloggedIn}
            uData={userdata}
            setLoginA={setIsloginA}
          />
        ) : (
          <Navber
            themedata={Theme}
            setMode={setTheme}
            Menu={showMenu}
            isLogin={isloggedIN}
            setLogin={setIsloggedIn}
            uData={userdata}
          />
        )}
        <Routes>
          <Route path="/" element={<Home isMenu={setShowMenu} />} />
          <Route
            path="/book/:BookId"
            element={<BookDetail uData={userdata} isLogin={isloggedIN} />}
          />
          <Route
            path="/history"
            element={<History uData={userdata} isLogin={isloggedIN} />}
          />
          <Route
            path="/profile"
            element={<Profile uData={userdata} isLogin={isloggedIN} />}
          />
          <Route
            path="/login"
            element={
              <Login
                isMenu={setShowMenu}
                isLogin={isloggedIN}
                setLogin={setIsloggedIn}
                setLoginA={setIsloginA}
              />
            }
          />
          <Route
            path="/login/:LogID"
            element={
              <Login
                isMenu={setShowMenu}
                isLogin={isloggedIN}
                setLogin={setIsloggedIn}
                setLoginA={setIsloginA}
              />
            }
          />
          <Route
            path="/admin/login"
            element={
              <ALogin
                isMenu={setShowMenu}
                isLogin={isloggedIN}
                setLoginA={setIsloginA}
                setLogin={setIsloggedIn}
              />
            }
          />
          <Route
            path="/admin/login/:LogID"
            element={
              <ALogin
                isMenu={setShowMenu}
                isLogin={isloggedIN}
                setLoginA={setIsloginA}
                setLogin={setIsloggedIn}
              />
            }
          />
          <Route
            path="/admin"
            element={<AHome isLogin={isloggedIN} user={userdata} />}
          />
          <Route
            path="/admin/profile"
            element={<AProfile uData={userdata} isLogin={isloggedIN} />}
          />
          <Route path="/admin/list" element={<AList userData={userdata} />} />
          <Route path="/admin/book" element={<ABook />} />
          <Route path="/admin/book/:Bid" element={<ABook />} />
          <Route path="/admin/user" element={<AUser />} />
          <Route path="/admin/user/add" element={<AAddUser />} />
          <Route path="/admin/u/:Uid" element={<UserDetall />} />
          <Route path="/admin/a/:Sid" element={<StaffDetall />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
