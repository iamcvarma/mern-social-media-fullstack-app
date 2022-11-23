import { Box } from "@mui/system";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        alt="userImage"
        width={size}
        height={size}
        src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
        style={{
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
};

export default UserImage;
