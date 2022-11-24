import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} varient="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        alt="advert"
        height="auto"
        src={`${process.env.REACT_APP_BASE_URL}/assets/info4.jpeg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>TheVeryOrdinaryBeauty</Typography>
        <Typography color={medium}>theveryordinarybeauty.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Enjoy 23% off sitewide! The Ordinary is your destination for Skincare,
        Makeup, Hair, and Body solutions. Discover clinical formulations with
        integrity.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
