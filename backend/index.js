const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push")
const { pullRepo } = require("./controllers/pull")
const { revertRepo } = require("./controllers/revert")

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
        addRepo
    )
    .command("commit <message>", "commit a new repository", (yargs) => {
        yargs.positional("message", {
            describe: "message to commit to the staging area",
            type: "String",

        })
    }, commitRepo)
    .command("push", "push a new repository", {}, pushRepo)
    .command("pull", "pull a new repository", {}, pullRepo)
    .command("revert <commitID>", "revert a new repository", (yargs) => {
        yargs.positional("commitID", {
            describe: "commit ID to revert to",
            type: "string"
        })
    }, revertRepo)
    .demandCommand(1, "you need atleast one command")
    .help().argv;
