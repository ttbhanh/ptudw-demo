"use strict";

const express = require("express");
const app = express();
const handebars = require("express-handlebars");
const port = process.env.PORT || 3000;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const models = require("./models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const csurf = require("csurf");
const csrfProtection = csurf({ cookie: true });

app.use(express.static(__dirname + "/public"));

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "S3cret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 5 * 60 * 1000, // 20ph
    },
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.username = req.cookies.username;
  res.locals.password = req.cookies.password;
  res.locals.isLoggedIn = req.session.isLoggedIn
    ? req.session.isLoggedIn
    : false;
  res.locals.isAdmin = req.session.isAdmin ? req.session.isAdmin : false;
  next();
});

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
  if (req.session.isAdmin) {
    res.locals.csrfToken = req.csrfToken();
  }
  res.render("details");
});

function checkLogin(req, res, next) {
  if (!req.session.isLoggedIn) {
    console.log(
      "Invalid request: You don't have permission to post a review. Please login to continue!"
    );
    return res.redirect(`/products/${req.body.id}`);
  }

  if (req.session.isAdmin) {
    return csrfProtection(req, res, next);
  }

  next();
}

app.post("/products", checkLogin, async (req, res) => {
  try {
    let strSQL = `INSERT INTO public."Reviews" ("stars", "productId", "review", "createdAt", "updatedAt") VALUES(5, ${req.body.id}, '${req.body.review}', Now(), Now())`;

    await models.sequelize.query(strSQL);
  } catch (error) {
    console.error(error);
  }
  res.redirect(`/products/${req.body.id}`);
});

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
          httpOnly: true,
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

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.get("/user", (req, res) => {
  res.render("user");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/sync", async (req, res) => {
  models.sequelize.sync().then(() => res.send("ok"));
});

app.get("/test", async (req, res) => {
  let strSQL = `INSERT INTO public."Reviews" ("stars", "review", "createdAt", "updatedAt") VALUES(5, '${req.query.hack}', Now(), Now())`;
  const results = await models.sequelize.query(strSQL);
  res.json(results);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
