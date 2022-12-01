import { useTheme } from "@emotion/react";
import {
  Box,
  CircularProgress,
  Fade,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";

const SearchResults = () => {
  const token = useSelector((state) => state.token);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [friends, setFriends] = useState([]);
  const { palette } = useTheme();
  const searchRef = useRef();
  useEffect(() => {
    if (!searchRef.current) return;
    const currRef = searchRef.current;
    const onFocus = () => setShowSearch(true);
    const offFocus = () => setShowSearch(false);
    currRef.addEventListener("focusin", onFocus);
    currRef.addEventListener("focusout", offFocus);
    return () => {
      currRef.removeEventListener("focusin", onFocus);
      currRef.removeEventListener("focusout", offFocus);
    };
  }, []);

  useEffect(() => {
    if (!search) {
      setFriends([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetch(`${process.env.REACT_APP_BASE_URL}/users/search/${search}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(({ data }) => setFriends(data))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search, token]);
  return (
    <>
      <FlexBetween>
        <InputBase
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search "
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "1rem",
            padding: "0.4rem 1rem",
          }}
        />
      </FlexBetween>
      <Fade in={showSearch} sx={{display:showSearch?"block":"none"}}>
        {
          <WidgetWrapper marginTop="1rem">
            {isLoading ? (
              <CircularProgress
                sx={{
                  display: "block",
                  margin: "0 auto",
                }}
              />
            ) : (
              <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.length > 0 ? (
                  friends.map((friend) => (
                    <Friend
                      key={friend._id}
                      friendId={friend._id}
                      name={`${friend.firstName} ${friend.lastName}`}
                      subtitle={friend.occupation}
                      userPicturePath={friend.picturePath}
                    />
                  ))
                ) : (
                  <Typography textAlign={"center"}>
                    {search
                      ? "No Results"
                      : "Try searching for people, topics, or keywords"}
                  </Typography>
                )}
              </Box>
            )}
          </WidgetWrapper>
        }
      </Fade>
    </>
  );
};

export default SearchResults;
