import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Alerts from "../widgets/Alerts";
import { Link, useParams } from "react-router-dom";
import { BiPencil, BiCategoryAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

function ABook() {
  const [file, setFile] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [bookData1, setBookData1] = useState([]);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");
  const { Bid } = useParams();

  // add book
  const [bookName, setBookName] = useState("");
  const [bookType, setBookType] = useState("");
  const [profile, setProfile] = useState("");

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const onClickUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("b_name", bookName);
    formData.append("types", bookType);
    const uploadImg = await axios({
      method: "post",
      url: "http://localhost:3001/book/add",
      data: formData,
    }).then((response) => {
      setMessage(response.data.message);
    });
  };
  const getBookData = async () => {
    await axios.get("http://localhost:3001/book").then((response) => {
      setBookData1(response.data);
    });
  };
  const DelBook = (bid) => {
    if (window.confirm("ต้องการลบข้อมูล ...")) {
      axios
        .post("http://localhost:3001/lend/admin", {
          sql: `DELETE FROM books WHERE b_id = ${bid}`,
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
  const bookTypeRes = ["การ์ตูน", "นิยาย", "สารคดี"];

  const getDataBookID = async () => {
    await axios
      .get(`http://localhost:3001/book/select/${Bid}`)
      .then((response) => {
        setBookData(response.data);
      });
    await axios.get("http://localhost:3001/book").then((response) => {
      setBookData1(response.data);
    });
  };

  const UpdateUser = (bid) => {
    axios
      .post(`http://localhost:3001/lend/admin`, {
        sql: `UPDATE books SET b_name = "${bookName}", types = "${bookType}" WHERE b_id = ${bid}`,
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
    if (Bid !== undefined) {
      getDataBookID();
    } else {
      getBookData();
    }
  }, [Bid, message]);

  useEffect(() => {
    bookData.map((value) => {
      setBookType(value.types);
      setBookName(value.b_name);
      setProfile(value.profile_path);
    });
  }, [bookData, bookData1]);
  console.log(bookType);
  return (
    <div className="flex flex-col w-full lg:flex-row mt-5 lg:p-0 p-2 ">
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/2">
        {Bid === undefined ? (
          <div class="flex flex-col md:flex-row">
            <div class="p-2 ">
              {Object.keys(imagePreviewUrl).length === 0 ? (
                <img
                  class="h-56 md:h-full w-full object-scale-down rounded-lg"
                  src="https://dummyimage.com/400x500/fff/000&text=Image"
                />
              ) : (
                <img
                  class="h-56 md:h-full w-full object-scale-down rounded-lg"
                  src={imagePreviewUrl}
                />
              )}
            </div>
            <form onSubmit={onClickUpload}>
              <div class="p-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ชื่อหนังสือ</span>
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    class="input input-bordered input-primary w-full max-w-xs"
                    required
                    onChange={(e) => {
                      setBookName(e.target.value);
                    }}
                  />
                </div>
                <div class="form-control mt-2">
                  <label class="label">
                    <span class="label-text">ประเภทหนังสือ</span>
                  </label>
                  <select
                    class="select select-primary w-full max-w-xs"
                    onChange={(e) => setBookType(e.target.value)}
                  >
                    <option value="การ์ตูน">การ์ตูน</option>
                    <option value="นิยาย">นิยาย</option>
                    <option value="สารคดี">สารคดี</option>
                  </select>
                </div>
                <div class="form-control mt-2">
                  <label class="label">
                    <span class="label-text">ปกหนังสือ</span>
                  </label>
                  <input
                    type="file"
                    className="custom-file-input"
                    accept="image/*"
                    required
                    onChange={handleUploadImage}
                  />
                </div>
                <div class="form-control mt-2">
                  <button class="btn btn-primary" type="submit">
                    SAVE
                  </button>
                </div>
                {message === "" ? (
                  ""
                ) : (
                  <div class="form-control mt-2">
                    <Alerts title={message} setHidden={setMessage} />
                  </div>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div class="flex flex-col md:flex-row">
            <div class="p-2 ">
              {Object.keys(imagePreviewUrl).length === 0 ? (
                <img
                  class="h-56 md:h-2/3 w-full object-scale-down rounded-lg"
                  src={`../../img/${profile}`}
                />
              ) : (
                <img
                  class="h-56 md:h-full w-full object-scale-down rounded-lg"
                  src={imagePreviewUrl}
                />
              )}
            </div>
              <div class="p-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ชื่อหนังสือ</span>
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    class="input input-bordered input-primary w-full max-w-xs"
                    defaultValue={bookName}
                    onChange={(e) => {
                      setBookName(e.target.value);
                    }}
                  />
                </div>
                <div class="form-control mt-2">
                  <label class="label">
                    <span class="label-text">ประเภทหนังสือ : {bookType}</span>
                  </label>
                  <select
                    class="select select-primary w-full max-w-xs"
                    defaultValue={bookType}
                    onChange={(e) => {
                      setBookType(e.target.value);
                    }}
                  >
                    {bookTypeRes.map((value) => (
                      <option
                        value={value}
                        {...(bookType === "การ์ตูน"
                          ? "selected"
                          : bookType === "นิยาย"
                          ? "selected"
                          : bookType === "สารคดี"
                          ? "selected"
                          : "")}
                      >
                        {value}
                      </option>
                    ))}
                    
                  </select>
                </div>
                
                {/* <div class="form-control mt-2">
                  <label class="label">
                    <span class="label-text">ปกหนังสือ</span>
                  </label>
                  <input
                    type="file"
                    className="custom-file-input"
                    accept="image/*"
                    required
                    onChange={handleUploadImage}
                  />
                </div> */}
                <div class="form-control mt-2">
                  <button class="btn btn-primary" onClick={() => UpdateUser(Bid)} type="submit">
                    Upload
                  </button>
                </div>
                {message === "" ? (
                  ""
                ) : (
                  <div class="form-control mt-2">
                    <Alerts title={message1} setHidden={setMessage1} />
                  </div>
                )}
              </div>
          </div>
        )}
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div class="grid flex-grow card bg-base-100 shadow-lg rounded-lg lg:w-1/2">
        <div class="flex flex-col lg:flex-row h-96 mt-2">
          <div class="overflow-x-auto w-full">
            <table class="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>รูป</th>
                  <th>ชื่อหนังสือ</th>
                </tr>
              </thead>
              <tbody>
                {bookData1.map((value) => {
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
                                <Link to={`/admin/book/${value.b_id}`}>
                                  <BiPencil /> แก้ไข
                                </Link>
                              </li>
                              <li onClick={() => DelBook(value.b_id)}>
                                <a>
                                  <AiOutlineDelete /> ลบ
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div class="avatar">
                              <div class="w-12 h-12 mask mask-squircle">
                                <img
                                  src={`../../img/${value.profile_path}`}
                                  alt={value.b_name}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div class="font-bold">{value.b_name}</div>
                            <span class="badge badge-ghost badge-sm">
                              {value.types}
                            </span>
                          </div>
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

export default ABook;
