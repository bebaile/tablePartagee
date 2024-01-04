const express = require("express");

const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const router = require("./router");

const app = express();

// use some application-level middlewares

// const whitelist = [
//   process.env.FRONTEND_URL,
//   process.env.FRONTEND_URL_WWW,
//   process.env.FRONTEND_URL_local_WWW,
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin:
//       [process.env.FRONTEND_URL, process.env.FRONTEND_URL_WWW] ??
//       "http://localhost:3002",
//     optionsSuccessStatus: 200,
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: "*",
//     optionsSuccessStatus: 200,
//     // credentials: true,
//   })
// );

app.use(
  cors({
    origin: [
      "http://192.168.31.10:3002",
      "http://192.168.31.84:3002",
      "http://localhost:3002",
      "http://tablepartage.ddns.net:81",
    ],

    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export
module.exports = app;
