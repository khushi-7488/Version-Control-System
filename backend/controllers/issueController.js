const createIssue = (req, res) => {
    res.send("Issue created")
}
const updateIssueById = (req, res) => {
    res.send("Issue updated")
}
const deleteIssueById = (req, res) => {
    res.send("Issue delete")
}
const getAllIssues = (req, res) => {
    res.send("Issue fetched")
}
const getIssueById = (req, res) => {
    res.send("Issue get")
}
module.exports = {
    createIssue, updateIssueById, deleteIssueById, getAllIssues, getIssueById,
}