const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path=require('path');

const userRouter=require("./routes/userRoutes");
const bookRouter=require("./routes/bookRoutes");
const commentRouter=require("./routes/commentRoutes");
const pageRouter=require("./routes/pageRoutes")


const connectDB = require("./config/db");

const app = express();

dotenv.config();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000", //frontend  url
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve("./public")));


const PORT = process.env.PORT || 8080;

app.use("/api/users",userRouter)
app.use("/api/books",bookRouter)
app.use("/api/comment",commentRouter)
app.use("/api/pages",pageRouter)

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
