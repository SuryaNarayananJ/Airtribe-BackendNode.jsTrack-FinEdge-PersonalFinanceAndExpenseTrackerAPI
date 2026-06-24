const express = require("express");
require("dotenv").config();
const app = express();

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const usersRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionsRoute");
const budgetsRoute = require("./routes/budgetsRoute");
const analyticsRoute = require("./routes/analyticsRoute");

const cors = require("cors");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use(cors());
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

//mounting routes
app.use("/airtribe/v1/users", usersRoute);
app.use("/airtribe/v1/transactions", transactionsRoute);
app.use("/airtribe/v1/budgets", budgetsRoute);
app.use("/airtribe/v1/analytics", analyticsRoute);

app.get("/airtribe/v1/health", (req, res) => {
  res.send("Airtribe API is online!");
});

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB via Mongoose!");

      app.listen(PORT, (err) => {
        if (err) {
          console.error("Something bad happened", err);
          process.exit(1);
        }

        console.log(`Server is listening on ${PORT}`);
      });
    })
    .catch(() => {
      console.log("MongoDB not connected!");
    });
}

module.exports = app;
