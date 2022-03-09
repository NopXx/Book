import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../widgets/Header";
import { motion, AnimatePresence } from "framer-motion";
import { BiCategoryAlt, BiCheckCircle, BiXCircle } from "react-icons/bi";
import moment from "moment";
import "moment/locale/th";
import Alerts from "../widgets/Alerts";

function AProfile({ uData, isLogin }) {
  const [isActive, setIsActive] = useState(false);
  let navigate = useNavigate();
  const [uid, setUid] = useState([]);
  const [userData, setUserData] = useState([]);
  const [dataLimit, setDataLimit] = useState(5);
  // History num
  const [lendData, setLendData] = useState([]);
  const [historyNum, setHistoryNum] = useState([]);
  const [his1Num, setHis1Num] = useState([]);
  const [his2Num, setHis2Num] = useState([]);
  // edit user
  const [sID, setSID] = useState("");
  const [userReg, setUserReg] = useState("");
  const [fnameReg, setFnameReg] = useState("");
  const [lnameReg, setLnameReg] = useState("");
  const [telReg, setTelReg] = useState("");

  // edit password
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");

  const getUserData = () => {
    axios.get(`http://localhost:3001/admin/${uid.s_id}`).then((response) => {
      setUserData(response.data);
    });
  };

  const getData = () => {
    axios
      .post(`http://localhost:3001/lend/admin/data`, {
        sql: `SELECT * FROM lends WHERE s_id = ${uid.s_id}`,
      })
      .then((response) => {
        setHistoryNum(response.data);
      });
    axios
      .post(`http://localhost:3001/lend/admin/data`, {
        sql: `SELECT * FROM lends WHERE s_id = ${uid.s_id} AND Date_night IS NOT NULL`,
      })
      .then((response) => {
        setHis1Num(response.data);
      });
    axios
      .post(`http://localhost:3001/lend/admin/data`, {
        sql: `SELECT * FROM lends WHERE s_id = ${uid.s_id} AND Date_night IS NULL`,
      })
      .then((response) => {
        setHis2Num(response.data);
      });
      axios
      .post("http://localhost:3001/lend/admin/data", {
        sql: `SELECT lends.id, lends.b_id, books.b_name, lends.u_id, user.u_fname, lends.s_id, staff.s_fname, lends.Borrow_date, lends.Time_allowed, lends.Date_night FROM (((lends INNER JOIN user ON lends.u_id = user.u_id) LEFT OUTER JOIN staff ON lends.s_id = staff.s_id)INNER JOIN books ON lends.b_id = books.b_id ) WHERE lends.s_id = ${uid.s_id} ORDER BY lends.Borrow_date desc LIMIT ${dataLimit}`,
      })
      .then((response) => {
        setLendData(response.data);
      });
  }

  const UpdateUser = (sid) => {
    axios
      .post(`http://localhost:3001/lend/admin`, {
        sql: `UPDATE staff SET s_fname = "${fnameReg}", s_lname = "${lnameReg}", s_user = "${userReg}", s_tel = "${telReg}" WHERE s_id = ${sid}`,
        mes: "แก้ไขข้อมูลสำเร็จ",
      })
      .then((response) => {
        setMessage(response.data.message);
        setMessage1(response.data.message);
      })
      .then(() => {
        setMessage("");
      });
  };
  useEffect(() => {
    if (isLogin) {
      uData.map((data) => {
        setUid(data);
      });
    } else {
      navigate("/admin/login");
      window.location.reload(true);
    }
  });
  useEffect(() => {
    getUserData();
    getData();
  }, [uid, message]);
  useEffect(() => {
    userData.map((data) => {
      setSID(data.s_id);
      setFnameReg(data.s_fname);
      setLnameReg(data.s_lname);
      setUserReg(data.s_user);
      setTelReg(data.s_tel);
    });
  }, [userData]);
  return (
    <>
      <Header title="Profile" />
      {userData.map((data) => {
        return (
          <div className="flex flex-col w-full lg:flex-row mt-5 lg:p-0 p-2 ">
            <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/3">
              <div class="flex flex-col justify-start h-auto mt-5">
                <div class="avatar placeholder">
                  <div class="bg-primary text-primary-content max-w-lg rounded-lg shadow-2xl w-28 md:w-48">
                    <span class="text-3xl">{data.s_fname}</span>
                  </div>
                  {message1 === "" ? (
                    ""
                  ) : (
                    <div class="form-control m-2">
                      <Alerts title={message1} setHidden={setMessage1} />
                    </div>
                  )}
                </div>
              </div>
              <div class="card-body">
                <div class="tabs">
                  <button
                    onClick={() => setIsActive(false)}
                    class={`tab tab-bordered ${!isActive ? "tab-active" : ""}`}
                  >
                    หน้าแรก
                  </button>
                  <button
                    onClick={() => setIsActive(true)}
                    class={`tab tab-bordered ${!isActive ? "" : "tab-active"}`}
                  >
                    แก้ไขข้อมูลส่วนตัว
                  </button>
                </div>
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    key={isActive ? isActive : "empty"}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isActive === false ? (
                      <div className="justify-start p-1 m-2">
                        <p className="py-1">ชื่อ : {data.s_fname}</p>
                        <p className="py-1">นามสกุล : {data.s_lname}</p>
                        <p className="py-1">Username : {data.s_user}</p>
                        <p className="py-1">เบอร์โทรศัพท์ : {data.s_tel}</p>
                        <p className="py-1">
                          ตำแหน่ง :{" "}
                          {data.position === 1 ? "ผู้ดูแลระบบ" : "พนักงาน"}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div class="form-control">
                          <label class="label">
                            <span class="label-text">ชื่อ</span>
                          </label>
                          <input
                            type="text"
                            placeholder="ชื่อ"
                            class="input input-bordered"
                            defaultValue={fnameReg}
                            onChange={(e) => {
                              setFnameReg(e.target.value);
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
                            defaultValue={lnameReg}
                            onChange={(e) => {
                              setLnameReg(e.target.value);
                            }}
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
                            defaultValue={userReg}
                            onChange={(e) => {
                              setUserReg(e.target.value);
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
                            defaultValue={telReg}
                            onChange={(e) => {
                              setTelReg(e.target.value);
                            }}
                          />
                        </div>
                        <div class="form-control mt-3">
                          <button
                            class="btn btn-primary"
                            onClick={() => UpdateUser(uid.s_id)}
                            type="submit"
                          >
                            UPDATE
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div class="divider lg:divider-horizontal"></div>
            <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/2">
              <div class="flex flex-col justify-start h-auto mt-5">
                <div class="stats stats-vertical lg:stats-horizontal shadow mb-2">
                  <div class="stat lg:w-1/3">
                    <div class="stat-figure text-primary">
                      <BiCategoryAlt class="w-8 h-8" />
                    </div>
                    <div class="stat-title">การยืมทั้งหมด</div>
                    <div class="stat-value">{historyNum.length}</div>
                    <div class="stat-desc"></div>
                  </div>

                  <div class="stat lg:w-1/3">
                    <div class="stat-figure text-primary">
                      <BiCheckCircle class="w-8 h-8" />
                    </div>
                    <div class="stat-title">คืนแล้ว</div>
                    <div class="stat-value">{his1Num.length}</div>
                    <div class="stat-desc"></div>
                  </div>

                  <div class="stat lg:w-1/3">
                    <div class="stat-figure text-primary">
                      <BiXCircle class="w-8 h-8" />
                    </div>
                    <div class="stat-title">ยังไม่คืน</div>
                    <div class="stat-value">{his2Num.length}</div>
                    <div class="stat-desc"></div>
                  </div>
                </div>
                <div class="overflow-x-auto w-full">
                  <table class="table w-full">
                    <thead>
                      <tr>
                        <th>ชื่อหนังสือ</th>
                        <th>วันที่ยืม</th>
                        <th>อนุญาต</th>
                        <th>การคืน</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lendData.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td>{val.b_name}</td>
                            <td>{moment(val.Borrow_date).format("LL")}</td>
                            <th>
                              {val.s_fname !== null ? (
                                <div class="badge badge-primary text-xs md:text-md">
                                  อนุณาต
                                </div>
                              ) : (
                                <div class="badge text-xs md:text-md">
                                  ไม่อนุณาต
                                </div>
                              )}
                            </th>
                            <th>
                              {val.Date_night !== null ? (
                                <div class="badge badge-primary text-xs md:text-md">
                                  คืนแล้ว
                                </div>
                              ) : (
                                "-"
                              )}
                            </th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button
                  class="btn btn-primary mt-2"
                  onClick={() => setDataLimit(dataLimit + 5)}
                  type="submit"
                >
                  More...
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AProfile;
