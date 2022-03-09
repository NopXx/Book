import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ALogin({ isMenu, isLogin, setLogin, setLoginA }) {
  let navigate = useNavigate();

  // Login
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  // loginStatus
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const login = () => {
    axios
      .post("http://localhost:3001/admin/login", {
        s_user: user,
        s_pw: pw,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginA(true);
          setLogin(true);
          navigate("/admin");
          window.location.reload(true);
        }
      });
  };

  const { LogID } = useParams();
  const setMenu = () => {
    if (LogID === undefined || 1 == 1) {
      return isMenu(true);
    }
  };
  useEffect(() => {
    setMenu();
  }, []);
  useEffect(() => {
    if (isLogin === true) {
      navigate("/admin");
      window.location.reload(true);
    }
  });
  console.log(loginStatus);
  return (
    <div class="hero mt-3 md:mt-24">
      <div class="flex-col justify-start hero-content">
        <div class="text-center md:text-left">
          <h1 class="mb-5 md:text-5xl text-2xl font-bold break-normal">
            ระบบยืม-คืนหนังสือ
          </h1>
          <p class="mb-2">book lending system Admin</p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl border mockup-window bg-base-100">
          <div class="tabs">
            <button class="tab tab-lifted tab-active">Login</button>
            <div class="flex-1 cursor-default tab tab-lifted"></div>
          </div>

          <div class="card-body ">
            {loginStatus === "" ? (
              ""
            ) : (
              <div class="alert shadow-lg alert-warning">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span> {loginStatus}</span>
                </div>
              </div>
            )}
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                class="input input-bordered"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered"
                onChange={(e) => {
                  setPw(e.target.value);
                }}
              />
            </div>
            <div class="form-control mt-6">
              {user === "" || pw === "" ? (
                ""
              ) : (
                <button onClick={() => login()} class="btn btn-primary">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ALogin;
