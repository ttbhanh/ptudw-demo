"use strict";

const express = require("express");
const app = express();
const handebars = require("express-handlebars");
const port = process.env.PORT || 3000;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const models = require("./models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const csurf = require("csurf");
const csrfProtection = csurf({ cookie: { httpOnly: true } });
const { query, validationResult } = require("express-validator");

app.use(express.static(__dirname + "/public"));

// cấu hình view template
app.engine(
  "hbs",
  handebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set("view engine", "hbs");

// cấu hình cho phép truy cập dữ liệu gửi qua req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cấu hình CORS
// const allowedOrigins = ["http://localhost:3000"]; // Thay bằng domain của bạn

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Bỏ qua kiểm tra nếu không có origin (ví dụ: request từ server)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true, // Cho phép gửi cookie
//   })
// );

// Cấu hình sử dụng Cookie
app.use(cookieParser("Secret to encrypt signed cookies"));

// Cấu hình sử dụng session
app.use(
  session({
    secret: "S3cret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 5 * 60 * 1000, // 20ph
      // secure: true, // Chỉ sử dụng khi sử dụng HTTPS
      sameSite: "Strict", // 'Strict' Cookie sẽ chỉ được gửi trong các yêu cầu từ cùng một site, ngăn chặn hoàn toàn các yêu cầu cross-site. Hoặc 'Lax' Cookie sẽ được gửi trong một số trường hợp như các yêu cầu GET thông thường từ các liên kết bên ngoài, nhưng vẫn bảo vệ khỏi nhiều loại tấn công CSRF.
      domain: "localhost:3000", // xác định cookie sẽ được gửi tới miền nào, có thể là toàn bộ các subdomain hoặc một miền cụ thể.
      // path: '/', // giới hạn cookie chỉ gửi tới các URL có đường dẫn khớp với path được chỉ định
    },
  })
);

// middleware đọc username và password được lưu trong cookies và gửi lên view
app.use((req, res, next) => {
  res.locals.username = req.cookies.username;
  res.locals.password = req.cookies.password;
  res.locals.isLoggedIn = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  res.locals.isAdmin = req.session.isAdmin ? req.session.isAdmin : false;
  next();
});

// homepage
app.get("/", async (req, res) => {
  let options = {
    attributes: ["id", "name", "price", "imagePath"],
  };
  if (req.query.keyword) {
    options.where = {
      name: { [Op.iLike]: `%${req.query.keyword}%` },
    };
  }
  res.locals.products = await models.Product.findAll(options);
  res.render("index", { keyword: req.query.keyword });
});

// products page
app.get("/products", async (req, res) => {
  let categoryId = req.query.category ? req.query.category : 0;
  let categories = await models.Category.findAll();
  const { QueryTypes } = require("sequelize");
  let strSQL = `SELECT id, name, price, "imagePath" FROM public."Products"`;
  if (categoryId != 0) {
    strSQL += ` WHERE "categoryId"=${categoryId}`;
  }
  try {
    const products = await models.sequelize.query(strSQL, {
      type: QueryTypes.SELECT,
    });
    return res.render("products", { products, categories });
  } catch (error) {
    console.error(error);
    return res.render("products", { message: error });
  }
});

// product's details page
app.get("/products/:id", csrfProtection, async (req, res) => {
  res.locals.product = await models.Product.findOne({
    attributes: ["id", "name", "price", "oldPrice", "description", "imagePath"],
    where: { id: req.params.id },
    include: [
      {
        model: models.Review,
      },
    ],
  });
  res.locals.csrfToken = req.csrfToken();

  res.render("details");
});

// middleware kiểm tra trạng thái đăng nhập
function checkLogin(req, res, next) {
  if (!req.session.isLoggedIn) {
    console.log(
      "Invalid request: You don't have permission to make this request. Please login to continue!"
    );
    return res.redirect(`/products/${req.body.id}`);
  }

  next();
}

// add review
app.post("/products", checkLogin, csrfProtection, async (req, res) => {
  // app.post("/products", checkLogin, async (req, res) => {
  try {
    let strSQL = `INSERT INTO public."Reviews" ("stars", "productId", "review", "createdAt", "updatedAt") VALUES(5, ${req.body.id}, '${req.body.review}', Now(), Now())`;

    await models.sequelize.query(strSQL);
  } catch (error) {
    console.error(error);
  }
  res.redirect(`/products/${req.body.id}`);
});

// xử lý delete review sử dụng phương thức delete
app.delete("/reviews", checkLogin, csrfProtection, async (req, res) => {
  try {
    await models.Review.destroy({ where: { id: req.body.id } });
    console.log("Review deleted!");
    return res.send("Review deleted!");
  } catch (error) {
    console.error(error);
    return res.send("Can not delete!");
  }
});

// xử lý delete review sử dụng phương thức post
// app.post("/reviews", csrfProtection, async (req, res) => {
app.post("/reviews", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.isAdmin) {
    let message =
      "Invalid request: You don't have permission to delete a review.";
    console.log(message);
    res.status(403);
    return res.send(message);
  }
  let review = await models.Review.findByPk(req.body.id);
  let productId = review.productId;
  try {
    console.log("Review deleted!");
    await models.Review.destroy({ where: { id: req.body.id } });
  } catch (error) {
    console.error(error);
  }
  return res.redirect(`/products/${productId}`);
});

// kiểm tra đăng nhập
app.post("/login", async (req, res) => {
  let { username, password, remember } = req.body;
  const { QueryTypes } = require("sequelize");
  const strSQL = `SELECT email, password, "isAdmin" FROM public."Users"
    WHERE email='${username}' and password='${password}'`;

  try {
    const users = await models.sequelize.query(strSQL, {
      type: QueryTypes.SELECT,
    });
    if (users.length > 0) {
      if (remember) {
        res.cookie("username", username, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: false,
        });
        res.cookie("password", password, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: false,
          // secure: true, // Chỉ sử dụng khi sử dụng HTTPS
          sameSite: "Strict", // hoặc 'Lax'
          domain: "localhost:3000",
          // path: '/', // Tùy chọn thêm nếu cần
        });
      }
      req.session.isLoggedIn = true;
      req.session.isAdmin = users[0].isAdmin;
      if (req.session.isAdmin) {
        return res.status(200).json({ redirect: "/admin" });
      }
      return res.status(200).json({ redirect: "/user" });
    }
    return res.status(401).json({ message: "Invalid username or password!" });
  } catch (error) {
    console.error(error);
    return res.json({ message: error });
  }
});

// logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// user page
app.get("/user", (req, res) => {
  res.render("user");
});

// admin page
app.get("/admin", (req, res) => {
  res.render("admin");
});

// create tables
app.get("/sync", async (req, res) => {
  models.sequelize.sync().then(() => res.send("ok"));
});

// test page
app.get(
  "/test",
  query("email").isEmail().withMessage("Invalid email address"),
  query("keyword").escape(),
  (req, res) => {
    let errors = validationResult(req);
    res.json({ ...errors, keyword: req.query.keyword });
  }
);

// error handling
app.use((req, res) => {
  res.status(404).send("Request NOT Found!");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send(`${error}`);
});

// start server
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
