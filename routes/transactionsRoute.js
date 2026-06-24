const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");
const validateJWT = require("../middlewares/JWTMiddleware");
const { validateTransaction } = require("../middlewares/validator");

router.use(validateJWT);

router.post("/", validateTransaction, transactionsController.createTransaction);
router.get("/", transactionsController.getAllTransactions);
router.get("/:id", transactionsController.getTransaction);
router.patch("/:id", transactionsController.updateTransaction);
router.delete("/:id", transactionsController.deleteTransaction);

module.exports = router;
