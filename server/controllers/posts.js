import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const {
      firstName,
      lastName,
      location,
      picturePath: userPicturePath,
    } = await User.findById(userId);

    const post = new Post({
      userId,
      firstName,
      lastName,
      location,
      description,
      userPicturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await post.save();

    const allPosts = await Post.find();
    res.status(201).json({ data: allPosts });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json({ data: allPosts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const allPosts = await Post.find({ userId });
    res.status(200).json({ data: allPosts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json({ data: updatedPost });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const commentPost = async (req, res) => {
  try {

    const { id } = req.params;
    const { userId ,comment} = req.body;
    const {comments} = await Post.findById(id);
    const { firstName, lastName } = await User.findById(userId);
    comments.push(`${firstName} ${lastName}: ${comment}`)
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments:comments },
      { new: true }
    );
    res.status(200).json({ data: updatedPost });
  } catch(err){
    res.status(404).json({ message: err.message });
  }
};
