import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  keyframes,
} from "@mui/material";
import Form from "./Form";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const bgGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
  return (
    <Box
      sx={{
        width:"100vw",
        height:"100vh",
        background: "linear-gradient(83deg,#0f73e1,#5091dd,#5350dd)",
        backgroundSize: "180% 180%",
        animation: `${bgGradient} 9s ease infinite`,
      }}
    >
      <FlexBetween
      sx={{
        padding:"1rem 6%",
        backgroundColor:`${theme.palette.background.alt}`,
        backdropFilter:" blur(11px) saturate(142%)"
      }}
        
      >
        <FlexBetween
          marginX="auto"
          sx={{
            cursor: "pointer",
          }}
        >
          <img alt="logo" src="../assets/logo.png" width="120px" />
        </FlexBetween>
      </FlexBetween>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" varient="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Bubble Wrap, the future of social media and networking.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
