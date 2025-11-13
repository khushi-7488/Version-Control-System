const Repository = require("../models/repoModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Repository Name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Repository Owner is required" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();

    res.status(201).json({
      message: "Repository created",
      repositoryID: result._id,
    });
  } catch (error) {
    console.error("Error creating Repository : ", error.message);
    res.status(500).send("Server error");
  }
}

async function getAllRepositories(req, res) {
  try {
    const Repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(Repositories);
  } catch (err) {
    console.error("Error during fetching Repository :", err.message);
    res.status(500).send("Server error");
  }
}

async function fetchRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.find({ _id: id })
      .populate("owner")
      .populate("issues");

    if (!repository) {
      res.status(400).json({ message: "No repository found !!" });
    }

    res.json(repository);
  } catch (error) {
    console.error("Error fetching Repository by ID : ", error.message);
    res.status(500).send("Server error");
  }
}

async function fetchRepositoryByName(req, res) {
  const { name } = req.params;
  try {
    const repository = await Repository.find({ name: name })
      .populate("owner")
      .populate("issues");

    if (!repository) {
      return res.status(404).json({ message: "Repository not found" });
    }

    res.json(repository);
  } catch (err) {
    console.error("Error during fetching Repository :", err.message);
    res.status(500).send("Server error");
  }
}

async function fetchRepositoriesForCurrentUser(req, res) {
  const userId = req.user;

  try {
    const repositories = await Repository.find({ owner: userId });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User repo not found" });
    }
    res.json({ message: "Repository found!", repositories });
  } catch (err) {
    console.error("Error during fetching Repository :", err.message);
    res.status(500).send("Server error");
  }
}
async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;
  try {
    const repository = await Repository.find({ _id: id });

    if (!repository) {
      return res.status(404).json({ error: " repository not found" });
    }

    repository.content.push(content);
    repository.description = description;

    const updateRepository = await repository.save();

    res.json({ message: "repository updated successsfully", repository: updateRepository });

  } catch (err) {
    console.error("Error during fetching Repository :", err.message);
    res.status(500).send("Server error");
  }
}
async function toggleVisibilityById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.find({ _id: id });

    if (!repository) {
      return res.status(404).json({ error: " repository not found" });
    }

    repository.visibility = !repository.visibility;

    const updateRepository = await repository.save();

    res.json({ message: "visibility toggled successsfully", repository: updateRepository });

  } catch (err) {
    console.error("Error during toggling visibility :", err.message);
    res.status(500).send("Server error");
  }

}
async function deleteRepositoryById(req, res) {
   const { id } = req.params;
  try {
    const repository = await Repository.findByIdAndDelete({ id });

    if (!repository) {
      return res.status(404).json({ error: " repository not found" });
    }

    res.json({ message: "deleted successsfully" });

  } catch (err) {
    console.error("Error during deleting :", err.message);
    res.status(500).send("Server error");
  }


}

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
