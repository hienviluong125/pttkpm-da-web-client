require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Auth controller
app.use("/auth", require("./controllers/auth.controller.js")(router));

// Dashboard controller
app.use(
  "/api/dashboard/workspace",
  require("./controllers/dashboard/workspace.controller.js")(router)
);
app.use(
  "/api/dashboard/workspace_type",
  require("./controllers/dashboard/workspaceType.controller.js")(router)
);

// Client controller
app.use("/api/user", require("./controllers/user.controller.js")(router));
app.use(
  "/api/workspace",
  require("./controllers/workspace.controller.js")(router)
);

app.listen(port, function () {
  console.log(`Listen to port ${port}`);
});

module.exports = app;
