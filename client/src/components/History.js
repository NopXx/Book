import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./widgets/Header";
import moment from "moment";
import "moment/locale/th";
import { IoIosSettings } from "react-icons/io";
import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";
import Alerts from "./widgets/Alerts";

function History({ uData, isLogin }) {
  let navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [uid, setUid] = useState([]);
  const [delState, setDelState] = useState("");
  const [bookReState, setBookReState] = useState("");
  // Date Now
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  // fun
  const getHistory = () => {
    axios.get(`http://localhost:3001/history/${uid}`).then((result) => {
      setHistory(result.data);
      console.log(result.data);
    });
  };
  useEffect(() => {
    if (isLogin === true) {
      uData.map((data) => {
        return setUid(data.u_id);
      });
    } else {
      navigate("/login");
      window.location.reload(true);
    }
  });
  const DelFun = (lendid) => {
    axios
      .post("http://localhost:3001/lends/del", {
        u_id: uid,
        lend_id: lendid,
      })
      .then((response) => {
        setDelState(response.data.message);
      });
  };
  const BookReturn = (lendid) => {
    axios
      .post("http://localhost:3001/lend/return", {
        u_id: uid,
        lend_id: lendid,
        date_night: dateTime,
      })
      .then((response) => {
        setBookReState(response.data.message);
      });
  };
  useEffect(() => {
    getHistory();
  }, [uid, delState, bookReState]);

  moment.locale("th");

  return (
    <>
      <Header title="History" show={false} />
      <div class="overflow-x-auto mt-4">
        {delState === "" ? (
          ""
        ) : (
          <Alerts title={delState} setHidden={setDelState} />
        )}
        {bookReState === "" ? (
          ""
        ) : (
          <Alerts title={bookReState} setHidden={setBookReState} />
        )}
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th className="text-xs md:text-lg">ชื่อหนังสือ</th>
              <th className="text-xs md:text-lg">วันที่ยืม</th>
              <th className="text-xs md:text-lg">สถานะการยืม</th>
              <th className="text-xs md:text-lg">วันที่อนุญาต</th>
              <th className="text-xs md:text-lg">วันที่คืนหนังสือ</th>
              <th className="text-xs md:text-lg">ตัวเลือก</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(history).length === 0
              ? "not data"
              : history.map((val) => {
                  return (
                    <tr>
                      <th className="text-xs md:text-lg">{val.b_name}</th>
                      <th className="text-xs md:text-lg">
                        {moment(val.Borrow_date).format("LLL")}
                      </th>
                      <th>
                        {val.s_fname !== null ? (
                          <div class="badge badge-primary text-xs md:text-md">
                            อนุณาต
                          </div>
                        ) : (
                          <div class="badge text-xs md:text-md">ไม่อนุณาต</div>
                        )}
                      </th>
                      <th className="text-xs md:text-lg">
                        {val.s_fname !== null
                          ? moment(val.Time_allowed).format("LLL")
                          : "-"}
                      </th>
                      <th className="text-xs md:text-lg">
                        {val.Date_night !== null
                          ? moment(val.Date_night).format("LLL")
                          : "-"}
                      </th>
                      <th className="text-xs md:text-lg">
                        <div class="dropdown dropdown-left dropdown-end">
                          <label tabindex="0" class="btn btn-outline">
                            <IoIosSettings className="md:text-lg" />
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
                              <li onClick={() => BookReturn(val.id)}>
                                <a>
                                  <AiOutlineCheckCircle />
                                  คืนหนังสือ</a>
                              </li>
                            )}

                            {val.s_id === null ? (
                              <li onClick={() => DelFun(val.id)}>
                                <a>
                                  <AiOutlineDelete />
                                  ยกเลิกการยืม
                                </a>
                              </li>
                            ) : val.Date_night !== null ? (
                              <li onClick={() => DelFun(val.id)}>
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
    </>
  );
}

export default History;
