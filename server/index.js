const express = require("express");
const total_car = require('./total_car_sales.json')
const multer = require("multer");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "book",
});

app.get("/book", (req, res) => {
  db.query("SELECT * FROM books ORDER BY b_id DESC", (err, result) => {
    if (err) {
      console.log("Error : " + err);
    } else {
      res.send(result);
    }
  });
});
app.get("/totalcar", (req, res) => {
  res.send(total_car)
});
app.get("/book/select/:id", (req, res) => {
  // รับค่าจาก /:id
  const id = req.params.id;
  // query sql
  db.query("SELECT * FROM books WHERE b_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/singup", (req, res) => {
  const u_user = req.body.u_user;
  const u_pw = req.body.u_pw;
  const u_fname = req.body.u_fname;
  const u_lname = req.body.u_lname;
  const u_tel = req.body.u_tel;

  bcrypt.hash(u_pw, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO user (u_user, u_pw, u_fname, u_lname, u_tel) VALUES (?, ?, ?, ?, ?)",
      [u_user, hash, u_fname, u_lname, u_tel],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

app.post("/lends", (req, res) => {
  const b_id = req.body.b_id;
  const u_id = req.body.u_id;
  const borrow_date = req.body.borrow_date;
  db.query(
    "INSERT INTO lends (b_id, u_id, borrow_date) VALUES (?, ?, ?)",
    [b_id, u_id, borrow_date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "ยืมหนังสือสำเร็จ" });
      }
    }
  );
});

app.post("/lends/del", (req, res) => {
  const u_id = req.body.u_id;
  const lend_id = req.body.lend_id;
  db.query(
    "DELETE FROM lends WHERE u_id = ? AND id = ?",
    [u_id, lend_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "ลบข้อมูลสำเร็จ" });
      }
    }
  );
});

app.post("/lend/return", (req, res) => {
  const lend_id = req.body.lend_id;
  const u_id = req.body.u_id;
  const date_night = req.body.date_night;
  db.query(
    "UPDATE lends SET Date_night = ? WHERE id = ? AND u_id = ?",
    [date_night, lend_id, u_id],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ message: "คืนหนังสือสำเร็จ" });
      }
    }
  );
});

app.post("/lend/admin", (req, res) => {
  const sql = req.body.sql;
  const mes = req.body.mes;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({message: mes})
    }
  })
})
app.post("/lend/admin/data", (req, res) => {
  const sql = req.body.sql;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.put("/lend/admin/update", (req, res) => {
  const sql = req.body.sql;
  const mes = req.body.mes;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(sql)
      res.send({message: mes})
    }
  })
})

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIN: true, user: req.session.user });
  } else {
    res.send({ loggedIN: false });
  }
});

app.post("/login", (req, res) => {
  const u_user = req.body.u_user;
  const u_pw = req.body.u_pw;
  db.query("SELECT * FROM user WHERE u_user = ?", [u_user], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(u_pw, result[0].u_pw, (err, response) => {
        if (response) {
          req.session.user = result;
          console.log(req.session.user);
          res.send(result);
        } else {
          res.send({ message: "Username / Password not match" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.post("/admin/login", (req, res) => {
  const s_user = req.body.s_user;
  const s_pw = req.body.s_pw;
  db.query(
    "SELECT * FROM staff WHERE s_user = ? AND s_pw = ?",
    [s_user, s_pw],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        if (result) {
          req.session.user = result;
          console.log(req.session.user);
          res.send(result);
        } else {
          res.send({ message: "Username / Password not match" });
        }
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.get("/history/:uId", (req, res) => {
  const uId = req.params.uId;

  db.query(
    "SELECT lends.id, lends.b_id, books.b_name, lends.u_id, user.u_fname, lends.s_id, staff.s_fname, lends.Borrow_date, lends.Time_allowed, lends.Date_night FROM (((lends INNER JOIN user ON lends.u_id = user.u_id) LEFT OUTER JOIN staff ON lends.s_id = staff.s_id)INNER JOIN books ON lends.b_id = books.b_id ) WHERE lends.u_id = ?  ORDER BY lends.Borrow_date desc",
    uId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/history", (req, res) => {
  db.query(
    "SELECT lends.id, lends.b_id, books.b_name, lends.u_id, user.u_fname, lends.s_id, staff.s_fname, lends.Borrow_date, lends.Time_allowed, lends.Date_night FROM (((lends INNER JOIN user ON lends.u_id = user.u_id) LEFT OUTER JOIN staff ON lends.s_id = staff.s_id)INNER JOIN books ON lends.b_id = books.b_id ) ORDER BY lends.Borrow_date desc",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/history/limit", (req, res) => {
  const limit = req.body.limit;
  db.query(
    `SELECT lends.id, lends.b_id, books.b_name, lends.u_id, user.u_fname, lends.s_id, staff.s_fname, lends.Borrow_date, lends.Time_allowed, lends.Date_night FROM (((lends INNER JOIN user ON lends.u_id = user.u_id) LEFT OUTER JOIN staff ON lends.s_id = staff.s_id)INNER JOIN books ON lends.b_id = books.b_id ) ORDER BY lends.Borrow_date desc LIMIT ${limit};`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/user/:uID", (req, res) => {
  const uID = req.params.uID;

  db.query("SELECT * FROM user WHERE u_id = ?", uID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/admin/:sID", (req, res) => {
  const sID = req.params.sID;

  db.query("SELECT * FROM staff WHERE s_id = ?", sID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/user", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/staff", (req, res) => {
  db.query("SELECT * FROM staff", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// upload file
const imageUploadPath = "../client/public/img";
var profile_path = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
    profile_path = `${file.originalname}`;
  },
});
const imageUpload = multer({ storage: storage });

app.post("/book/add", imageUpload.single("file"), (req, res) => {
  const b_name = req.body.b_name;
  const types = req.body.types;
  console.log(b_name);
  console.log(types);
  console.log(profile_path);
  db.query("INSERT INTO books (b_name, types, profile_path) VALUES (?, ?, ?)",[b_name, types, profile_path],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "เพิ่มข้อมูลสำร็จ" });
    }
  })
});

app.get("/logout", (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("userId");
  });
});

app.listen("3001", () => {
  console.log("Server Run Port 3001");
});
