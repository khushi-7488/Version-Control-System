const fs = require("fs").promises;
const path = require("path");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, S3_BUCKET } = require("../config/aws-config.js");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");
  try {
    await fs.access(repoPath);
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const commitStats = await fs.stat(commitPath);
      if (!commitStats.isDirectory()) continue;
      const files = await fs.readdir(commitPath);
      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const command = new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        });

        await s3.send(command);
      }
    }
    console.log("All commits pushed to S3");
  } catch (err) {
    console.log("Error pushing to S3:", err);
  }
}
module.exports = { pushRepo };
