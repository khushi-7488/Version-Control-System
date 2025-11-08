const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const staggingPath = path.join(repoPath, "staging");
    try {
        await fs.mkdir(staggingPath, { recurseve: true })
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(staggingPath, fileName))
        console.log(`File ${fileName} added to the staging area!`)
    } catch (err) {
        console.log("Error adding file ", err)
    }
}
module.exports = { addRepo };