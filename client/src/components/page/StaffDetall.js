import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BiCategoryAlt, BiCheckCircle, BiXCircle } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/th";
import Alerts from "../widgets/Alerts";

function StaffDetall() {
  const { Sid } = useParams();
  const [sData, setSData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  // History num
  const [lendData, setLendData] = useState([]);
  const [historyNum, setHistoryNum] = useState([]);
  const [his1Num, setHis1Num] = useState([]);
  const [his2Num, setHis2Num] = useState([]);
  // const [pwReg, setPwReg] = useState("");
  const [dataLimit, setDataLimit] = useState(5);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [user, setUser] = useState("");
  const [tel, setTel] = useState("");
  const [position, setPosition] = useState("");

  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");

  const getData = () => {
    axios.get(`http://localhost:3001/admin/${Sid}`).then((response) => {
      setStaffData(response.data);
    });
    axios
      .post(`http://localhost:3001/lend/admin/data`, {
        sql: `SELECT * FROM lends WHERE s_id = ${Sid}`,
      })
      .then((response) => {
        setHistoryNum(response.data);
      });
    axios
      .post(`http://localhost:3001/lend/admin/data`, {
        sql: `SELECT * FROM lends WHERE s_id = ${Sid} AND Date_night IS NOT NULL`,
      })
      .then((response) => {
        setHis1Num(response.data);
      });
    axios
      .post(`http://localhost:3001/lend/admin/data`, {
        sql: `SELECT * FROM lends WHERE s_id = ${Sid} AND Date_night IS NULL`,
      })
      .then((response) => {
        setHis2Num(response.data);
      });
    axios
      .post("http://localhost:3001/lend/admin/data", {
        sql: `SELECT lends.id, lends.b_id, books.b_name, lends.u_id, user.u_fname, lends.s_id, staff.s_fname, lends.Borrow_date, lends.Time_allowed, lends.Date_night FROM (((lends INNER JOIN user ON lends.u_id = user.u_id) LEFT OUTER JOIN staff ON lends.s_id = staff.s_id)INNER JOIN books ON lends.b_id = books.b_id ) WHERE lends.s_id = ${Sid} ORDER BY lends.Borrow_date desc LIMIT ${dataLimit}`,
      })
      .then((response) => {
        setLendData(response.data);
      });
  };

  const UpdateUser = (sid) => {
    axios
      .post(`http://localhost:3001/lend/admin`, {
        sql: `UPDATE staff SET s_fname = "${fname}", s_lname = "${lname}", s_user = "${user}", s_tel = "${tel}", position = ${position} WHERE s_id = ${sid}`,
        mes: "???????????????????????????????????????????????????",
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
  }, [message, dataLimit]);
  useEffect(() => {
    staffData.map((staff) => {
      setSData(staff);
      setFname(staff.s_fname);
      setLname(staff.s_lname);
      setUser(staff.s_user);
      setTel(staff.s_tel);
      setPosition(staff.position);
    });
  }, [staffData]);
  return (
    <div className="flex flex-col w-full lg:flex-row mt-5 lg:p-0 p-2 ">
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/3">
        <div class="flex flex-col justify-start h-auto mt-5">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content max-w-lg rounded-lg shadow-2xl w-28 md:w-60">
              <span class="text-3xl">{sData.s_fname}</span>
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
                ?????????????????????
              </button>
              <button
                onClick={() => setIsActive(true)}
                class={`tab tab-bordered ${!isActive ? "" : "tab-active"}`}
              >
                ??????????????????????????????????????????????????????
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
                    <p className="py-1">???????????? : {sData.s_fname}</p>
                    <p className="py-1">????????????????????? : {sData.s_lname}</p>
                    <p className="py-1">Username : {sData.s_user}</p>
                    <p className="py-1">??????????????????????????????????????? : {sData.s_tel}</p>
                    <p className="py-1">
                      ????????????????????? :{" "}
                      {sData.position === 1 ? "?????????????????????????????????" : "?????????????????????"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">????????????</span>
                      </label>
                      <input
                        type="text"
                        placeholder="????????????"
                        class="input input-bordered"
                        defaultValue={fname}
                        onChange={(e) => {
                          setFname(e.target.value);
                        }}
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">?????????????????????</span>
                      </label>
                      <input
                        type="text"
                        placeholder="?????????????????????"
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
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">???????????????????????????????????????</span>
                      </label>
                      <input
                        type="text"
                        placeholder="???????????????????????????????????????"
                        class="input input-bordered"
                        defaultValue={tel}
                        onChange={(e) => {
                          setTel(e.target.value);
                        }}
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">?????????????????????</span>
                      </label>
                      <select
                        class="select select-primary w-full max-w-xs"
                        defaultValue={position}
                        onChange={(e) => setPosition(e.target.value)}
                      >
                        <option
                          value="2"
                          {...(position === 2 ? "selected" : "")}
                        >
                          ?????????????????????
                        </option>
                        <option
                          value="1"
                          {...(position === 1 ? "selected" : "")}
                        >
                          ?????????????????????????????????
                        </option>
                      </select>
                    </div>
                    <div class="form-control mt-3">
                      <button
                        class="btn btn-primary"
                        onClick={() => UpdateUser(Sid)}
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
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/2">
        <div class="flex flex-col justify-start h-auto mt-5">
          <div class="stats stats-vertical lg:stats-horizontal shadow mb-2">
            <div class="stat lg:w-1/3">
              <div class="stat-figure text-primary">
                <BiCategoryAlt class="w-8 h-8" />
              </div>
              <div class="stat-title">???????????????????????????????????????</div>
              <div class="stat-value">{historyNum.length}</div>
              <div class="stat-desc"></div>
            </div>

            <div class="stat lg:w-1/3">
              <div class="stat-figure text-primary">
                <BiCheckCircle class="w-8 h-8" />
              </div>
              <div class="stat-title">?????????????????????</div>
              <div class="stat-value">{his1Num.length}</div>
              <div class="stat-desc"></div>
            </div>

            <div class="stat lg:w-1/3">
              <div class="stat-figure text-primary">
                <BiXCircle class="w-8 h-8" />
              </div>
              <div class="stat-title">???????????????????????????</div>
              <div class="stat-value">{his2Num.length}</div>
              <div class="stat-desc"></div>
            </div>
          </div>
          <div class="overflow-x-auto w-full">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>?????????????????????????????????</th>
                  <th>???????????????????????????</th>
                  <th>??????????????????</th>
                  <th>??????????????????</th>
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
                            ??????????????????
                          </div>
                        ) : (
                          <div class="badge text-xs md:text-md">???????????????????????????</div>
                        )}
                      </th>
                      <th>
                        {val.Date_night !== null ? (
                          <div class="badge badge-primary text-xs md:text-md">
                            ?????????????????????
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
}

export default StaffDetall;
