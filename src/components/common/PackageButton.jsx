import React from "react";
import Button from "@mui/material/Button";

const PackageButton = ({ color, text, variant }) => {
  return (
    <Button
      sx={{
        color: "white",
        height: "30px",
        width: "100px",
        fontSize: "15px",
        fontWeight: "500",
        variant: `${variant}`,
        backgroundColor: `${color}`,
        "&:hover": {
          backgroundColor: "#0bb348",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default PackageButton;
