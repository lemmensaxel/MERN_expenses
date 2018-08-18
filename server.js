const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import the routes
const expensesRoutes = require("./routes/api/expenses");
const usersRoutes = require("./routes/api/users");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const DB_URI = require("./config/keys").mongoURI;

// Connect to mongoDB
mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

// Use routes in different files
app.use("/api/expenses", expensesRoutes);
app.use("/api/users", usersRoutes);

// Start the app
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
