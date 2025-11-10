const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router.js");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

dotenv.config();

yargs(hideBin(process.argv))
  .command("start", "Start a new server", {}, startServer)

  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "add a new repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "file to add to the staging area",
        type: "String",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "commit a new repository",
    (yargs) => {
      yargs.positional("message", {
        describe: "message to commit to the staging area",
        type: "String",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("push", "push a new repository", {}, pushRepo)
  .command("pull", "pull a new repository", {}, pullRepo)
  .command(
    "revert <commitID>",
    "revert a new repository",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "commit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  .demandCommand(1, "you need atleast one command")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 9000;

  // app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors({ origin: "*" }));

  const mongoURI = process.env.mongo_URL;
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log("unable to connect", err));

  app.use("/", mainRouter);

  let user = "test";

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("======");
      console.log(user);
      console.log("======");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operation called");
  });

  httpServer.listen(port, () => {
    console.log("server is running");
  });
}
