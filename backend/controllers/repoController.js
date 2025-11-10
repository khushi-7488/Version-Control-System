const createRepository = (req, res) => {
  res.send("repo created");
};
const getAllRepositories = (req, res) => {
  res.send("all repo ftched");
};
const fetchRepositoryById = (req, res) => {
  res.send("repo fetched");
};
const fetchRepositoryByName = (req, res) => {
  res.send("repo fetched");
};
const fetchRepositoriesForCurrentUser = (req, res) => {
  res.send("repo is for loged in user fetched");
};
const updateRepositoryById = (req, res) => {
  res.send("repo updated!");
};
const toggleVisibilityById = (req, res) => {
  res.send("visibility toggled !");
};
const deleteRepositoryById = (req, res) => {
  res.send("repo deleted!");
};

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
