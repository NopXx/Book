import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Alerts from "../widgets/Alerts";
import { BiUser } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

function AAddUser() {
  const [sData, setSData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [staffData, setStaffData] = useState([]);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [tel, setTel] = useState("");
  const [position, setPosition] = useState("");

  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");

  const AddUser = () => {
    axios
      .post(`http://localhost:3001/lend/admin`, {
        sql: `INSERT INTO staff (s_fname, s_lname, s_user, s_pw, s_tel, position) VALUES ("${fname}", "${lname}", "${user}", "${pw}", "${tel}", ${position})`,
        mes: "เพิ่มข้อมูลสำเร็จ",
      })
      .then((response) => {
        setMessage(response.data.message);
        setMessage1(response.data.message);
      })
      .then(() => {
        setMessage("");
      });
  };
  const getData = () => {
    axios.get("http://localhost:3001/staff").then((response) => {
      setStaffData(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, [message]);
  return (
    <div className="flex flex-col w-full lg:flex-row mt-5 lg:p-0 p-2 ">
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/3">
        <div class="flex flex-col justify-start h-auto mt-5">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content max-w-lg rounded-lg shadow-2xl w-28 md:w-60">
              <span class="text-3xl">{fname}</span>
            </div>
          </div>
          {message1 === "" ? (
            ""
          ) : (
            <div class="form-control m-2">
              <Alerts title={message1} setHidden={setMessage1} />
            </div>
          )}
          <div class="card-body">
            <div class="tabs">
              <button class={`tab tab-bordered tab-active`}>เพิ่มข้อมูล</button>
            </div>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={isActive ? isActive : "empty"}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ชื่อ</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ชื่อ"
                    class="input input-bordered"
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">นามสกุล</span>
                  </label>
                  <input
                    type="text"
                    placeholder="นามสกุล"
                    class="input input-bordered"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
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
                    placeholder="username"
                    class="input input-bordered"
                    onChange={(e) => {
                      setPw(e.target.value);
                    }}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">เบอร์โทรศัพท์</span>
                  </label>
                  <input
                    type="text"
                    placeholder="เบอร์โทรศัพท์"
                    class="input input-bordered"
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ตำแหน่ง</span>
                  </label>
                  <select
                    class="select select-primary w-full max-w-xs"
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="2">พนักงาน</option>
                    <option value="1">ผู้ดูแลระบบ</option>
                  </select>
                </div>
                <div class="form-control mt-3">
                  <button
                    class="btn btn-primary"
                    onClick={() => AddUser()}
                    type="submit"
                  >
                    SAVE
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/2">
        <div class="flex flex-col justify-start h-auto mt-5">
          <div class="overflow-x-auto w-full">
            <div class="stats shadow m-2">
              <div class="stat w-60">
                <div class="stat-figure text-primary">
                <MdOutlineAdminPanelSettings class="w-8 h-8" />
                </div>
                <div class="stat-title">Staff</div>
                <div class="stat-value text-primary">{staffData.length}</div>
              </div>
              {message1 === "" ? (
                ""
              ) : (
                <div class="form-control m-2">
                  <Alerts title={message1} setHidden={setMessage1} />
                </div>
              )}
            </div>
            <table class="table w-full">
              <thead>
                <tr>
                  <th>ชื่อ - สกุล</th>
                  <th>User</th>
                  <th>เบอร์โทร</th>
                  <th>ตำแหน่ง</th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((value) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <div class="font-bold">{value.s_fname}</div>
                          <div class="text-sm opacity-50">{value.s_lname}</div>
                        </td>
                        <td>
                          <div class="font-bold">{value.s_user}</div>
                        </td>
                        <td>{value.s_tel}</td>
                        <td>
                          {value.position === 1 ? (
                            <>
                              <div class="flex item-center">
                                <MdOutlineAdminPanelSettings class="w-5 h-5" />
                                &nbsp;ผู้ดูแลระบบ
                              </div>
                            </>
                          ) : (
                            <div class="flex item-center">
                              <BiUser class="w-5 h-5" />
                              &nbsp;พนักงาน
                            </div>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AAddUser;
