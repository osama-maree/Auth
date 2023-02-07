require("dotenv").config();
const express = require("express");
const app = express();
const port = 4001;
var cors = require('cors')
 
app.use(cors())
const authRouter = require("./modules/auth/auth.route");
const connectDB = require("./DB/connection");
connectDB();
app.use(express.json());

app.use(`${process.env.MYPATH}/auth`, authRouter);
app.get("/", (req, res) => res.send("Hello World!"));

app.use("*", (req, res) => {
  res.json({ message: "this page is not found 404" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
