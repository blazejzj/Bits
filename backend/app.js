require("dotenv").config();

// server
const express = require("express");
const app = express();

// passportjs
const passport = require("passport");
const configurePassport = require("./config/passportConfig");
configurePassport(passport);

// cors
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// routers
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
app.use("/", indexRouter);
app.use("/user/", userRouter);

// listen
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is now running. with port " + port);
});
