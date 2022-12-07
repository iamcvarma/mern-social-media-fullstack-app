import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
  searchHandler,
  patchUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read
router.get('/:id', verifyToken,getUser)
router.get('/:id/friends',verifyToken,getUserFriends)

// update

router.patch('/:id/:friendId',verifyToken,addRemoveFriends)
router.patch('/:id',verifyToken,patchUser)

router.get('/search/:keyword',verifyToken,searchHandler)
export default router