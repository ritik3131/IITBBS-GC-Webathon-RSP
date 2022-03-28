const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const replyRouter = require("./routes/replyRoutes");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const searchRouter = require("./routes/searchRoutes");
// const UserModel = require("./model/userModel");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

require("./config/passport")(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    credentials: true,
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_HOST);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// Session;
app.use(cookieParser("secretsssss"));
app.use(
  session({
    secret: "secretsssss",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    cookie: {
      maxAge: 10*60 * 60 * 1000,
      secure: false,
    },
  })
);

// Passwort Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(async (req, res, next) => {
  if (!req.user) return next();
  if (req.user.mailId === process.env.ADMIN_ID) {
    req.user.role = "admin";
    req.session.isAdmin = true;
    req.session.save();
    await req.user.save();
  } else req.session.isAdmin = false;
  next();
});

const PORT = process.env.PORT || 9000;

app.use("/api/v1/", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/reply", replyRouter);
app.use("/api/v1/search", searchRouter);

app.listen(PORT, console.log(`Server running at ${PORT}`));

process.on("unhandledRejection", (err) => {
  // unhandled promise rejection
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
