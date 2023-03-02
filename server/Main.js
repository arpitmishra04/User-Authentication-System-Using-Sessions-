const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserModel = require("./Models/user");
const { uploadFile } = require("./Models/upload");
const { fetchFile } = require("./Models/fetch");
const app = express();
const multer = require("multer");
const uuid = require("uuid").v4;

//configuering multer...
const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/" });

const port = 5000; //The port number to which the express app is listening...
const MongoDB_URL = "mongodb://0.0.0.0:27017/sessions"; //This is the URL of mongoDB server
// If modifying these scopes, delete token.json.

//Connecting to the MongoDB Database...
mongoose
  .connect(MongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("MongoDB connected Successfully...");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

const store = new MongoDBSession({
  uri: MongoDB_URL,
  collection: "UserSessions",
});
/*const users = [
  {
    id: 1,
    email: "user1@example.com",
    password: "$2b$10$L8O/GsNC2yT17PmTSG7RLuMkIHmI7xuDK.9XVgKTy8mrAhFQ7KB3q",
  }, // password is "password1"
  {
    id: 2,
    email: "user2@example.com",
    password: "$2b$10$wR0Mk4W4rlvAcShGx5Bq9e2/Yz0S5l0axYvHfCjfsK.BZYay8Wz7y",
  }, // password is "password2"
];*/

app.use(bodyParser.json());
app.use(
  session({
    secret: "mysecret", // secret used to sign the session ID cookie
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // set the allowed HTTP methods
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"], // set the allowed request headers
    exposedHeaders: ["Content-Disposition"], // set the exposed response headers
    credentials: true, // set to true to enable sending cookies cross-origin
  })
);
// API endpoint for user login
app.post("/api/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid user email, please try again" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Invalid user password, please try again" });
    }

    req.session.userId = user.id;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// API endpoint for user signup
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const User = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await User.save();

    req.session.userId = User.id;
    res.status(201).json({ message: "success" });
  } catch (err) {
    if (err.code === 11000) res.status(400).send("User Already Exists...");
  }
});

/*app.get("/redirect", (req, res) => {
  res.redirect("/login");
});*/

// API endpoint for user logout
app.get("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Logout failed" });
    }

    res.status(200).json({ message: "Logout Successfull" });
  });
});

//get request at startup for test
app.get("/api/user", async (req, res) => {
  // req.session.isMurga = true;
  //console.log(req.session.id);
  //console.log(req.session);
  const id = req.session.id;
  let user = await UserModel.findOne({ id });
  return res.status(200).send(user);
  //return res.status(200).send("<h1>Hello,Myself Arpit</h1>");
});

/**
 * Uploads the Images and Files to the Google Drive
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
app.post("/api/upload", upload.single("image"), async (req, res) => {
  const { title } = req.body;
  //console.log(req.body);
  const file = req.file.path;

  //console.log(file.originalname);
  uploadFile(title, file);
  res.status(200).send("File Uploaded Successfully");
});

app.get("/api/fetch", (req, res) => {
  const files = fetchFile()
    .then((arr) => {
      console.log(arr);
      res.status(200).send(arr);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log("Server is listening on port:", port);
});
