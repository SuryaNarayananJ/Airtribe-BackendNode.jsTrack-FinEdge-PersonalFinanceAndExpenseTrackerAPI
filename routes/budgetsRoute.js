const express = require("express");
const router = express.Router();
const budgetsController = require("../controllers/budgetsController");
const validateJWT = require("../middlewares/JWTMiddleware");

router.use(validateJWT);

router.post("/", budgetsController.createBudget);
router.get("/summary", budgetsController.getSummary);

module.exports = router;
