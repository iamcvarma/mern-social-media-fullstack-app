/* eslint-disable no-unused-vars */
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const getFriends = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data: friendList } = await response.json();
    dispatch(setFriends({ friends: friendList }));
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WidgetWrapper>
      {friends.length>0 && (<Typography
        color={palette.neutral.dark}
        varient="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>)}
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length === 0 ? (
          <WidgetWrapper
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <PersonOffIcon />
            <Typography>The user has yet to add new friends</Typography>
          </WidgetWrapper>
        ) : (
          friends.map((friend) => (
            <Friend
              key={`${friend._id}`}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        )}
      </Box>
    </WidgetWrapper>
  );
};
export default FriendListWidget;
