const Repository = require("../models/repoModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createIssue(req, res) {
    const { title, description } = req.body;
    const { id } = req.params;

    try {
        const issue = new issue({
            title,
            description,
            repository: id,
        });
        await issue.save();
        res.status(201).json(issue);
    } catch (err) {
        console.error("Error during issue creation :", err.message);
        res.status(500).send("Server error");
    }
}

async function updateIssueById(req, res) {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const issue = await Repository.findById(id);

        if (!issue) {
            return res.status(404).json({ issue });
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();
        res.json({ message: "issue updated" })


    } catch (err) {
        console.error("Error during updating issue :", err.message);
        res.status(500).send("Server error");
    }

}

async function deleteIssueById(req, res) {
    const { id } = req.params;

    try {
        const issue = await Repository.findByIdAndDelete(id);

        if (!issue) {
            return res.status(404).json({ issue });
        }

        res.json({ message: "issue deleted" })
    } catch (err) {
        console.error("Error during deleting issue :", err.message);
        res.status(500).send("Server error");
    }
}

async function getAllIssues(req, res) {
    try {
        const issue = await Repository.find({});

        if (!issue) {
            return res.status(404).json({ issue });
        }

        res.json({ message: "all issue fetched" })

    } catch (err) {
        console.error("Error during getching all issue  :", err.message);
        res.status(500).send("Server error");
    }
}

async function getIssueById(req, res) {
    const { id } = req.params;
    try {
        const issue = await Repository.findById(id);

        if (!issue) {
            return res.status(404).json({ issue });
        }

        res.json({ message: "issue fetched by id" })

    } catch (err) {
        console.error("Error during getching all issue  :", err.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById,
};
