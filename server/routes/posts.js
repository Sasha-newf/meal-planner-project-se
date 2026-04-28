const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const optionalAuth = require("../middleware/optionalAuth");

const {
  getFeed,
  getPostById,
  createPost,
  getMyPosts,
} = require("../controllers/postsController");

router.get("/feed", optionalAuth, getFeed);
router.get("/mine", requireAuth, getMyPosts);
router.get("/:id", optionalAuth, getPostById);
router.post("/", requireAuth, createPost);

module.exports = router;