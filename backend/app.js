require("dotenv").config();

// server
const express = require("express");
const app = express();

// cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// passportjs
const passport = require("passport");
const configurePassport = require("./config/passportConfig");
configurePassport(passport);

// cors
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// routers
const postsRouter = require("./routes/postsRouter");
const profileRouter = require("./routes/profileRouter");
const authRouter = require("./routes/authRouter");
app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

// listen
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is now running. with port " + port);
});
