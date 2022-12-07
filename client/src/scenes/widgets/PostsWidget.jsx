import { Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data: posts } = await response.json();
    dispatch(setPosts({ posts }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data: posts } = await response.json();
    dispatch(setPosts({ posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {posts.length === 0 ? (
        <WidgetWrapper display='flex' flexDirection="column" alignItems="center">
          <SpeakerNotesOffIcon />
          <Typography>The user has yet to post anything</Typography>
        </WidgetWrapper>
      ) : (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
