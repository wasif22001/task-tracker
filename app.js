const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
//app.use(rateLimiter);

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Task Tracker API");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
