import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  IconButton,
  CardActionArea,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { updateUser } from "state";

const UserWidget = ({ user, isProfile }) => {
  const [isTwitterLinkOpen, setIsTwitterLinkOpen] = useState(false);
  const [isLinkedInOpen, setIsLinkedInOpen] = useState(false);
  const [isUpdateNameOpen, setIsUpdateNameOpen] = useState(false);
  const twitterRef = useRef(null);
  const linkedinRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    _id: userId,
    picturePath,
  } = user;

  const handleTwitterInput = () => {
    if (!twitterRef.current) return;
    fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ twitter: twitterRef.current.value }),
    })
      .then(() => {
        dispatch(updateUser({ twitter: twitterRef.current.value }));
        setIsTwitterLinkOpen(false);
      })
      .catch((err) => alert(err.message));
  };
  const handleLinkedInInput = () => {
    if (!linkedinRef.current) return;
    fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkedin: linkedinRef.current.value }),
    })
      .then(() => {
        dispatch(updateUser({ linkedin: linkedinRef.current.value }));
        setIsLinkedInOpen(false);
      })
      .catch((err) => alert(err.message));
  };
  const handleUpdataNameInput = () => {
    if (!firstNameRef.current && !lastNameRef.current) return;
    fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
      }),
    })
      .then(() => {
        dispatch(
          updateUser({
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
          })
        );
        setIsUpdateNameOpen(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween gap="0.5rem" pb="1.1rem">
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.main,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          {!isProfile && (
            <IconButton onClick={() => setIsUpdateNameOpen(true)}>
              <ManageAccountsOutlined />
            </IconButton>
          )}
        </FlexBetween>

        <Divider />

        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>

        <Divider />

        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>
              Peope who visited your profile
            </Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>People who liked your posts</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>

        <Divider />

        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <CardActionArea
              onClick={() => window.open(user.twitter, "_blank")}
              disabled={!user.twitter}
              sx={{
                display: "flex",
                gap: "1rem",
                justifyContent: "start",
                borderRadius: "1rem",
                padding: "0.5rem 1rem",
                "&:hover": {
                  color: palette.primary.dark,
                },
              }}
            >
              <img src="../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography fontWeight="500">Twitter</Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </CardActionArea>
            {!isProfile && (
              <IconButton onClick={() => setIsTwitterLinkOpen(true)}>
                <EditOutlined sx={{ color: main }} />
              </IconButton>
            )}
          </FlexBetween>
          <FlexBetween gap="1rem">
            <CardActionArea
              onClick={() => window.open(user.linkedin, "_blank")}
              disabled={!user.linkedin}
              sx={{
                display: "flex",
                gap: "1rem",
                justifyContent: "start",
                borderRadius: "1rem",
                padding: "0.5rem 1rem",
                "&:hover": {
                  color: palette.primary.dark,
                },
              }}
            >
              <img src="../assets/linkedin.png" alt="linkedin" />
              <Box>
                <Typography fontWeight="500">Linkedin</Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </CardActionArea>

            {!isProfile && (
              <IconButton onClick={() => setIsLinkedInOpen(true)}>
                <EditOutlined sx={{ color: main }} />
              </IconButton>
            )}
          </FlexBetween>
        </Box>
      </WidgetWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          made by
          <GitHubIcon fontSize="small" sx={{ margin: "0.2rem" }} />
          <Link
            href="https://github.com/iamcvarma"
            target="_blank"
            underline="hover"
            sx={{
              "&:hover": {
                color: "#CC5500",
              },
            }}
          >
            iamcvarma
          </Link>
        </Typography>
      </Box>
      <Dialog
        open={isTwitterLinkOpen}
        onClose={() => setIsTwitterLinkOpen(false)}
      >
        <DialogTitle>Twitter Social Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your twitter profile link to add it to your profile
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={twitterRef}
            margin="dense"
            id="name"
            label="Twitter Link"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTwitterLinkOpen(false)}>Cancel</Button>
          <Button onClick={handleTwitterInput}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isLinkedInOpen} onClose={() => setIsLinkedInOpen(false)}>
        <DialogTitle>LinkedIn Social Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your linkedin profile link to add it to your profile
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={linkedinRef}
            margin="dense"
            id="name"
            label="Linkedin Link"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsLinkedInOpen(false)}>Cancel</Button>
          <Button onClick={handleLinkedInInput}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isUpdateNameOpen}
        onClose={() => setIsUpdateNameOpen(false)}
      >
        <DialogTitle>Update Your Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new first and last name to update
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={firstNameRef}
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={lastNameRef}
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateNameOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdataNameInput}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserWidget;
