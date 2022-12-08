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
        minHeight:"100vh  ",
        background: "linear-gradient(83deg,#037af9,#5f9fe8,#5653eb)",
        backgroundSize: "180% 180%",
        animation: `${bgGradient} 9s ease infinite`,
      }}
    >
     
      <FlexBetween
      sx={{
        padding:"1rem 6%",
        background: "rgba( 255, 255, 255, 0.2 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 6.5px )",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
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
        minHeight="65vh"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        display="grid"
        gridTemplateColumns={isNonMobileScreen?"1fr 1fr":"0fr 1fr"}
        overflow="hidden"
      >
        <Box
        component="img"
        src="/assets/login-main.png"
        alt="login art"
        sx={{
          width:"100%",
          height:"100%",
          objectFit:"cover"
        }}
        > 
        
        </Box>
        <Box 
        >
          <Box
          p="2rem">

        <Typography fontWeight="500" varient="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Bubble Wrap, the future of social media and networking.
        </Typography>
        <Form />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
