const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv  = require("dotenv");

dotenv.config();

const app = express();

const connection = require("./config/db");
connection.once("open", () => console.log("DB Connected"));
connection.on("error", () => console.log("Error"));

app.use(
  express.json({
    extended: false,
  })
);

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.use("/", require("./routes/redirect"));
app.use("/api/url", authenticateToken, require("./routes/url"));

app.post("/api/createNewUser", (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`));
