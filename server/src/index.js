import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { serverPORT } from "./config.js";
import usersController from "./controllers/users-controller.js";
import authController from "./controllers/auth-controller.js";
import jwtStrategy from "./auth/strategy.js";
import passport from "passport";
import adminsController from "./controllers/admins-controller.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const PORT = process.env.PORT || serverPORT;
const herokuURL = "https://ttodorov.herokuapp.com";
const localClientURL = "http://localhost:3000";
const isDev = process.env.NODE_ENV !== "production";
const currentClURL = isDev ? localClientURL : herokuURL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(cors());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "*"],
      frameSrc: ["'self'"],
      childSrc: ["'self'"],
      scriptSrc: ["'self'", "*"],
      styleSrc: ["'self'"],
      fontSrc: ["'self'"],
      imgSrc: ["'self'"],
      baseUri: ["'self'"],
    },
  })
);
app.use(express.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.use("/users", usersController);
app.use("/admins", adminsController);

app.use("/app", express.static("public/avatars"));

passport.use(jwtStrategy);
app.use(passport.initialize());
app.use("/auth", authController);

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(
    path.resolve(__dirname, "../../client/build", "index.html")
  );
});

app.listen(PORT, function () {
  console.error(
    `Node ${
      isDev ? "dev server" : "cluster worker " + process.pid
    }: listening on port ${PORT}`
  );
});


// Multi-process to utilize all CPU cores.
// import cluster from 'cluster';
// import os from 'os';
// const numCPUs = os.cpus().length;
// if (!isDev && cluster.isMaster) {
//   console.error(`Node cluster master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.error(
//       `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
//     );
//   });
// } else {
//   // express logic
// }