import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BiCategoryAlt, BiCheckCircle, BiXCircle } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import "moment/locale/th";
import Alerts from "../widgets/Alerts";

function UserDetall() {
  const [uData, setUData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  // History num
  const [lendData, setLendData] = useState([]);
  const [historyNum, setHistoryNum] = useState([]);
  const [his1Num, setHis1Num] = useState([]);
  const [his2Num, setHis2Num] = useState([]);
  // update userdata
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [user, setUser] = useState("");
  const [tel, setTel] = useState("");
  const { Uid } = useParams();
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");

  const getData = () => {
    axios.get(`http://localhost:3001/user/${Uid}`).then((response) => {
      setUserData(response.data);
    });
    axios.get(`http://localhost:3001/history/${Uid}`).then((response) => {
      setHistoryNum(response.data);
    });
    axios
      .post(`http://localhost:3001/lend/admin/data`, {
        sql: `SELECT * FROM lends WHERE u_id = ${Uid} AND Date_night IS NOT NULL`,
      })
      .then((response) => {
        setHis1Num(response.data);
      });
    axios
      .post(`http://localhost:3001/lend/admin/data`, {
        sql: `SELECT * FROM lends WHERE u_id = ${Uid} AND Date_night IS NULL`,
      })
      .then((response) => {
        setHis2Num(response.data);
      });
    axios
      .post("http://localhost:3001/lend/admin/data", {
        sql: `SELECT lends.id, lends.b_id, books.b_name, lends.u_id, user.u_fname, lends.s_id, staff.s_fname, lends.Borrow_date, lends.Time_allowed, lends.Date_night FROM (((lends INNER JOIN user ON lends.u_id = user.u_id) LEFT OUTER JOIN staff ON lends.s_id = staff.s_id)INNER JOIN books ON lends.b_id = books.b_id ) WHERE lends.u_id = ${Uid} ORDER BY lends.Borrow_date desc LIMIT 5`,
      })
      .then((response) => {
        setLendData(response.data);
      });
  };

  const UpdateUser = (uid) => {
    axios
      .post(`http://localhost:3001/lend/admin`, {
        sql: `UPDATE user SET u_fname = "${fname}", u_lname = "${lname}", u_user = "${user}", u_tel = "${tel}" WHERE u_id = ${uid}`,
        mes: "แก้ไขข้อมูลแล้ว",
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
    getData();
  }, [message]);
  useEffect(() => {
    userData.map((user) => {
      setUData(user);
      setFname(user.u_fname);
      setLname(user.u_lname);
      setUser(user.u_user);
      setTel(user.u_tel);
    });
  }, [userData]);
  return (
    <div className="flex flex-col w-full lg:flex-row mt-5 lg:p-0 p-2 ">
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/3">
        <div class="avatar placeholder">
          <div class="bg-primary text-primary-content max-w-lg rounded-lg shadow-2xl w-28 md:w-60">
            <span class="text-3xl">{uData.u_fname}</span>
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
                  <p className="py-1">ชื่อ : {uData.u_fname}</p>
                  <p className="py-1">นามสกุล : {uData.u_lname}</p>
                  <p className="py-1">Username : {uData.u_user}</p>
                  <p className="py-1">เบอร์โทรศัพท์ : {uData.u_tel}</p>
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
                      defaultValue={fname}
                      onChange={(e) => setFname(e.target.value)}
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
                      defaultValue={lname}
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
                      defaultValue={user}
                      onChange={(e) => setUser(e.target.value)}
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
                      defaultValue={tel}
                      onChange={(e) => setTel(e.target.value)}
                    />
                  </div>
                  <div class="form-control mt-3">
                    <button
                      class="btn btn-primary"
                      onClick={() => UpdateUser(Uid)}
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
                          <div class="badge text-xs md:text-md">ไม่อนุณาต</div>
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
        </div>
      </div>
    </div>
  );
}

export default UserDetall;
