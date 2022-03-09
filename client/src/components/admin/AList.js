import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/th";
import { BiCategoryAlt, BiCheckCircle } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";

function AList({ userData }) {
  const [listData, setListData] = useState([]);
  const [uData, setUData] = useState([]);
  const [message, setMessage] = useState("");
  // Date Now
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const getData = () => {
    axios.get("http://localhost:3001/history").then((response) => {
      setListData(response.data);
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
    getData();
  }, [message]);
  useEffect(() => {
    userData.map((val) => {
      return setUData(val);
    });
  });
  return (
    <div class="flex justify-center">
      <div class="flex flex-col">
        <div class="overflow-x-auto w-full mt-4">
          <table class="table w-full">
            <thead>
              <tr>
                <th>ชื่อผู้ใช้</th>
                <th>ชื่อหนังสือ</th>
                <th>วันที่ยืม</th>
                <th>อนุญาต</th>
                <th>วันที่อนุญาต</th>
                <th>การคืน</th>
                <th>วันที่คืน</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.u_fname}</td>
                    <td>{val.b_name}</td>
                    <td>{moment(val.Borrow_date).format("LLL")}</td>
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
                      {val.s_fname !== null
                        ? moment(val.Time_allowed).format("LLL")
                        : "-"}
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
                      {val.Date_night !== null
                        ? moment(val.Date_night).format("LLL")
                        : "-"}
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

export default AList;
