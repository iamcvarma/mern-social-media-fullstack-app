/* eslint-disable no-unused-vars */

import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutline,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [userComment, setUserComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUser]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUser }),
      }
    );
    const { data: newPost } = await response.json();
    dispatch(setPost({ post: newPost }));
  };

  const patchComment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUser, comment: userComment }),
      }
    );
    const { data: newPost } = await response.json();
    setUserComment("");
    dispatch(setPost({ post: newPost }));
  };
  
  const deleteComment=async () =>{
    await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
    {
      method:"DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
    dispatch(deletePost({id:postId}))

  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments((pre) => !pre)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
          {postUserId===loggedInUser && <IconButton>
            <DeleteOutline 
            onClick={deleteComment}
            />
          </IconButton>}
        </FlexBetween>
      </FlexBetween>
      <Fade in={isComments} sx={{ display: isComments ? "block" : "none" }}>
        <Box>
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
                <Divider />
              </Box>
            ))}
          </Box>
          <FlexBetween sx={{ paddingTop: "1rem" }}>
            <InputBase
              placeholder="Write a comment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1rem",
                padding: "0.5rem 1rem",
              }}
            />
            <Button
              disabled={!userComment}
              onClick={patchComment}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "1rem",
                padding: "0.5rem 1rem",
                marginLeft: "0.5rem",
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                  backgroundColor: palette.primary.dark,
                },
                "&:disabled": {
                  color: palette.background.alt,
                  backgroundColor: palette.neutral.main,
                },
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </Box>
      </Fade>
    </WidgetWrapper>
  );
};

export default PostWidget;
