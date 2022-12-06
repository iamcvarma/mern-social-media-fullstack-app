import express from "express";
import { getFeedPosts, getUserPosts, likePost,commentPost,deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment",verifyToken,commentPost)
router.delete("/:postId", verifyToken,deletePost)
export default router;
