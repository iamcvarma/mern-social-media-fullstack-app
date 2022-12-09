import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "scenes/navBar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import SearchResults from "components/SearchResults";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget user = {user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={user._id} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <SearchResults />

            <Box m="1rem 0" />
            <FriendListWidget userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
