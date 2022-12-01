import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  return (
    <>
      <FlexBetween
        padding="1rem 6%"
        backgroundColor={theme.palette.background.alt}
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
    </>
  );
};

export default LoginPage;
