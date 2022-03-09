import React, { useState, useEffect } from "react";
import Header from "./widgets/Header";
import Card from "./widgets/Card";
import Axios from "axios";
import { motion } from "framer-motion";

function Home({ isMenu }) {
  const [booklist, setBooklist] = useState([]);
  const [bookdata, setBookdata] = useState([]);
  const [searchText, setSearchText] = useState("");
  isMenu(false);
  const getBook = () => {
    Axios.get("http://localhost:3001/book").then((response) => {
      setBookdata(response.data);
    });
  };
  var CardElement = "";
  if (searchText === "") {
    CardElement = bookdata.map((value, index) => {
      return <Card key={index} data={value} />;
    });
  } else {
    CardElement = bookdata
      .filter((data) => {
        return (
          data.b_name.includes(searchText) || data.types.includes(searchText)
        );
      })
      .map((val, index) => {
        return <Card key={index} data={val} />;
      });
  }
  useEffect(() => {
    getBook();
  }, []);
  const variants = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.5,
      },
    },
  };
  return (
    <>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8">
          <div class="container mx-auto">
            <Header title="Home" show={true} Search={setSearchText} />
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {CardElement}
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
