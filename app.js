require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const routes = require("./src/routes/api");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "https://node-project-pro-test.herokuapp.com",
      },
    ],
  },
  apis: ["./src/routes/api/*.js"],
};
const specs = swaggerJsDoc(options);
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/users", routes.users);
app.use("/api/questions", routes.questions);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
