const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGO_URL;

let client;

async function connectClient(params) {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
}

async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("test");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exits" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err) {
    console.log("error during signup", err);
    res.status(500).send("server error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("test");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    res.json({ token, user: user._id });
  } catch (err) {
    console.log("error during login", err);
    res.status(500).send("server error");
  }
}

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("test");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.send(users);
  } catch (err) {
    console.log("Error during fetching", err);
    res.status(500).send("server error");
  }
}

async function getUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    await connectClient();
    const db = client.db("test");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentID),
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json({ user, message: "profile fetched" });
  } catch (err) {
    console.log("error fetching", err);
    res.status(500).send("server error");
  }
}

async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("test");
    const usersCollection = db.collection("users");

    let updateFields = { email };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }
    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(currentID) },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    if (!result.value) { // Check if user was found
      return res.json({ message: "updated" });
    }
    res.send(result.value);
  } catch (err) {
    console.log("error", err);
    res.status(500).send("server error");
  }
}
async function deleteUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    await connectClient();
    const db = client.db("test");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentID),
    });
    if (result.deletedCount == 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User profile deleted" });
  } catch (err) {
    console.log("error", err);
    res.status(500).send("server error");
  }
}
module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
