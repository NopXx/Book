import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiPencil, BiCategoryAlt, BiUser } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Alerts from "../widgets/Alerts";

function AUser() {
  const [userData, setUserData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");

  const getData = () => {
    axios.get("http://localhost:3001/user").then((response) => {
      setUserData(response.data);
    });
    axios.get("http://localhost:3001/staff").then((response) => {
      setStaffData(response.data);
    });
  };

  const DelUser = (uid) => {
    if (window.confirm("ต้องการลบข้อมูล ...")) {
      axios
        .post("http://localhost:3001/lend/admin", {
          sql: `DELETE FROM user WHERE u_id = ${uid}`,
          mes: "ลบข้อมูลสำเร็จ",
        })
        .then((response) => {
          setMessage(response.data.message);
          setMessage1(response.data.message);
        })
        .then(() => {
          setMessage("");
        });
    }
  };
  const DelStaff = (sid) => {
    if (window.confirm("ต้องการลบข้อมูล ...")) {
      axios
        .post("http://localhost:3001/lend/admin", {
          sql: `DELETE FROM staff WHERE s_id = ${sid}`,
          mes: "ลบข้อมูลสำเร็จ",
        })
        .then((response) => {
          setMessage(response.data.message);
          setMessage1(response.data.message);
        })
        .then(() => {
          setMessage("");
        });
    }
  };

  useEffect(() => {
    getData();
  }, [message]);

  return (
    <div className="flex flex-col w-full lg:flex-row mt-5 lg:p-0 p-2 ">
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/2">
        <div class="flex flex-col md:flex-row">
          <div class="overflow-x-auto w-full">
            <div class="stats shadow m-2">
              <div class="stat w-60">
                <div class="stat-figure text-primary">
                  <BiUser class="w-8 h-8" />
                </div>
                <div class="stat-title">User</div>
                <div class="stat-value text-primary">{userData.length}</div>
              </div>
              {message1 === "" ? (
                ""
              ) : (
                <div class="form-control m-2">
                  <Alerts title={message1} setHidden={setMessage1} />
                </div>
              )}
            </div>
            <table class="table w-full mt-2">
              <thead>
                <tr>
                  <th></th>
                  <th>ชื่อ - สกุล</th>
                  <th>User</th>
                  <th>เบอร์โทร</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((value) => {
                  return (
                    <>
                      <tr>
                        <th>
                          <div class="dropdown dropdown-right dropdown-end">
                            <label tabindex="0" class="btn btn-ghost btn-xs">
                              <BiCategoryAlt class="w-5 h-5" />
                            </label>
                            <ul
                              tabindex="0"
                              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <Link to={`/admin/u/${value.u_id}`}>
                                  <BiPencil /> แก้ไข
                                </Link>
                              </li>
                              <li onClick={() => DelUser(value.u_id)}>
                                <Link to="#">
                                  <AiOutlineDelete /> ลบ
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>
                          <div class="font-bold">{value.u_fname}</div>
                          <div class="text-sm opacity-50">{value.u_lname}</div>
                        </td>
                        <td>
                          <div class="font-bold">{value.u_user}</div>
                        </td>
                        <td>{value.u_tel}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/2">
        <div class="flex flex-col md:flex-row">
          <div class="overflow-x-auto w-full">
            <div class="stats shadow m-2">
              <div class="stat w-60">
                <div class="stat-figure text-primary">
                  <MdOutlineAdminPanelSettings class="w-8 h-8" />
                </div>
                <div class="stat-title">Staff</div>
                <div class="stat-value text-primary">{staffData.length}</div>
                <Link to="/admin/user/add" class="stat-desc">
                  + เพิ่มข้อมูล
                </Link>
              </div>
            </div>
            <table class="table w-full">
              <thead>
                <tr>
                  <th></th>
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
                        <th>
                          <div class="dropdown dropdown-right dropdown-end">
                            <label tabindex="0" class="btn btn-ghost btn-xs">
                              <BiCategoryAlt class="w-5 h-5" />
                            </label>
                            <ul
                              tabindex="0"
                              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <Link to={`/admin/a/${value.s_id}`}>
                                  <BiPencil /> แก้ไข
                                </Link>
                              </li>
                              <li onClick={() => DelUser(value.s_id)}>
                                <Link to="#">
                                  <AiOutlineDelete /> ลบ
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </th>
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

export default AUser;
