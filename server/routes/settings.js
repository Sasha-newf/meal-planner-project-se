const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

const router = express.Router();

router.get("/", requireAuth, getSettings);
router.put("/", requireAuth, updateSettings);

module.exports = router;