const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
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
