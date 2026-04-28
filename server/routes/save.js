const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { savePost, getSavedPosts, unsavePost } = require("../controllers/saveController");

router.post("/posts/:id/save", requireAuth, savePost);
router.get("/saved", requireAuth, getSavedPosts);
router.delete("/posts/:id/save", requireAuth, unsavePost);

module.exports = router;