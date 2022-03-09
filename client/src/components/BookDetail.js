import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerts from "./widgets/Alerts";
import { motion } from "framer-motion";

function BookDetail({ uData, isLogin }) {
  const [bookData, setBookData] = useState([]);
  const [uid, setUid] = useState([]);
  const { BookId } = useParams();
  const [lendState, setLendState] = useState("");
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  const getBookData = () => {
    axios
      .get(`http://localhost:3001/book/select/${BookId}`)
      .then((response) => {
        setBookData(response.data);
      });
  };
  useEffect(() => {
    if (isLogin === true) {
      uData.map((data) => {
        return setUid(data.u_id);
      });
    }
  });
  useEffect(() => {
    getBookData();
  }, [uid]);
  const postLend = () => {
    axios
      .post("http://localhost:3001/lends", {
        b_id: BookId,
        u_id: uid,
        borrow_date: dateTime,
      })
      .then((response) => {
        setLendState(response.data.message);
      });
  };
  console.log(uid);
  return (
    <main>
      {bookData.map((book) => {
        return (
          <>
            <motion.div
              layout
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, scale: 1 }}
              className="mx-auto py-6 sm:px-6 lg:px-8"
            >
              <Link
                to="/"
                className="btn btn-outline btn-primary btn-sm md:btn-md md:w-36 md:text-lg p-2 m-2"
              >
                Back
              </Link>

              <div className="container mx-auto flex justify-center">
                <div className="flex flex-col rounded-lg shadow-lg md:flex-row md:max-w-6xl m-2">
                  <img
                    className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-1/3 md:rounded-none md:rounded-l-lg"
                    src={`../img/${book.profile_path}`}
                    alt=""
                  />
                  <div className="flex justify-between flex-col p-4 leading-normal">
                    <div>
                      <h5 className=" md:text-2xl font-bold tracking-tight">
                        <span>ชื่อ : </span>
                        {book.b_name}
                      </h5>
                      <div className="divider"></div>
                      <h5 className="mb-5 md:text-2xl font-bold tracking-tight">
                        <span>ประเภท : </span>
                        {book.types}
                      </h5>
                    </div>
                    <div>
                      {lendState === "" ? (
                        ""
                      ) : (
                        <Alerts title={lendState} setHidden={setLendState} />
                      )}
                      {isLogin ? (
                        uid === undefined ? (
                          ""
                        ) : (
                          <button
                            onClick={() => postLend()}
                            className="btn btn-outline btn-primary btn-sm md:btn-md md:w-36 md:text-lg mt-5"
                          >
                            ยืม
                          </button>
                        )
                      ) : (
                        <Link
                          to="/login"
                          className="btn btn-outline btn-primary btn-sm md:btn-md md:w-36 md:text-lg mt-5"
                        >
                          เข้าสู่ระบบ
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        );
      })}
    </main>
  );
}

export default BookDetail;
