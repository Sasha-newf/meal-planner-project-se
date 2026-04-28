const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const { addToPlan, getPlan, deleteFromPlan } = require("../controllers/planController");

router.post("/", requireAuth, addToPlan);
router.get("/", requireAuth, getPlan);
router.delete("/:id", requireAuth, deleteFromPlan);

module.exports = router;