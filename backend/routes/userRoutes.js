const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getLoggedInUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getLoggedInUser);

// Add protect as a second param
router.get("/me", protect, getLoggedInUser);

module.exports = router;