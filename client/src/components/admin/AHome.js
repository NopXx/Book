import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../widgets/Dashboard";
import moment from "moment";
import "moment/locale/th";
import { BiCategoryAlt, BiCheckCircle } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";

function AHome({ isLogin, user }) {
  const [historyData, setHistoryData] = useState([]);
  const [lendData, setLendData] = useState([]);
  const [dataLimit, setDataLimit] = useState(5);
  const [bookData, setBookData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [uData, setUData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [message, setMessage] = useState("");
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  let navigate = useNavigate();

  const getHistory = () => {
    axios.get("http://localhost:3001/history").then((response) => {
      setHistoryData(response.data);
    });
    axios.get("http://localhost:3001/book").then((response) => {
      setBookData(response.data);
    });
    axios.get("http://localhost:3001/user").then((response) => {
      setUserData(response.data);
    });
    axios.get("http://localhost:3001/staff").then((response) => {
      setStaffData(response.data);
    });
    axios
      .post("http://localhost:3001/history/limit", {
        limit: dataLimit,
      })
      .then((response) => {
        setLendData(response.data);
      });
  };
  // อนุญาตการยืมหนังสือ
  const approve = (lendid, uid) => {
    axios
      .post("http://localhost:3001/lend/admin", {
        sql: `UPDATE lends SET Time_allowed = "${dateTime}", s_id = ${uData.s_id} WHERE id = ${lendid} AND u_id = ${uid}`,
        mes: "อนุณาตสำเร็จ",
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .then(() => {
        setMessage("");
      });
  };
  // ยกเลิกการยืม
  const Unapprove = (lendid, uid) => {
    axios
      .post("http://localhost:3001/lend/admin", {
        sql: `UPDATE lends SET Time_allowed = null, s_id = null WHERE id = ${lendid} AND u_id = ${uid}`,
        mes: "ยกเลิกอนุณาตสำเร็จ",
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .then(() => {
        setMessage("");
      });
  };
  // ลบประวัติ
  const DelFun = (lendid, uid, bid) => {
    axios
      .post("http://localhost:3001/lend/admin", {
        sql: `DELETE FROM lends WHERE id = ${lendid} AND u_id = ${uid} AND b_id = ${bid}`,
        mes: "ลบข้อมูลสำเร็จ",
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .then(() => {
        setMessage("");
      });
  };

  useEffect(() => {
    getHistory();
  }, [message, dataLimit]);
  useEffect(() => {
    if (isLogin !== true) {
      navigate("/admin/login");
      window.location.reload(true);
    }
  });
  useEffect(() => {
    user.map((val) => {
      return setUData(val);
    });
  });
  console.log(uData);
  return (
    <div class="flex justify-center w-full lg:flex-row">
      <div class="flex flex-col place-content-center">
        <Dashboard
          bookNum={bookData}
          historyNum={historyData}
          userNum={userData}
          staffNum={staffData}
        />
        <div class="divider"></div>
        <div class="overflow-x-auto w-auto">
          <div class="flex justify-between">
            <h1 class="my-2 mx-1">รายการล่าสุด</h1>
            <select
              class="m-1 select select-bordered select-primary w-auto max-w-xs"
              onChange={(e) => setDataLimit(e.target.value)}
            >
              <option disabled selected>
                จำนวนรายการ
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <table class="table table-normal w-full">
            <thead>
              <tr>
                <th>ชื่อผู้ใช้</th>
                <th>ชื่อหนังสือ</th>
                <th>วันที่ยืม</th>
                <th>อนุญาต</th>
                <th>การคืน</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lendData.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.u_fname}</td>
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
                    <th>
                      <div class="dropdown dropdown-left dropdown-end">
                        <label tabindex="0" class="btn btn-outline btn-sm">
                          <BiCategoryAlt class="w-5 h-5" />
                        </label>
                        <ul
                          tabindex="0"
                          class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                        >
                          {val.s_id === null ? (
                            ""
                          ) : val.Date_night !== null ? (
                            ""
                          ) : (
                            <li onClick={() => Unapprove(val.id, val.u_id)}>
                              <a>
                                <AiOutlineCheckCircle />
                                ยกเลิกการอนุญาต
                              </a>
                            </li>
                          )}

                          {val.s_id === null ? (
                            <li onClick={() => approve(val.id, val.u_id)}>
                              <a>
                                <BiCheckCircle />
                                อนุณาต
                              </a>
                            </li>
                          ) : val.Date_night !== null ? (
                            <li
                              onClick={() => DelFun(val.id, val.u_id, val.b_id)}
                            >
                              <a>
                                <AiOutlineDelete />
                                ลบประวัติ
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AHome;
