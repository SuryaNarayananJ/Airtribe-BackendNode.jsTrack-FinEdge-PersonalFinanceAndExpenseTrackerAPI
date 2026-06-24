const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const validateJWT = require("../middlewares/JWTMiddleware");

router.use(validateJWT);

router.get("/balance", analyticsController.getBalance);
router.get("/tips", analyticsController.getTips);

module.exports = router;
