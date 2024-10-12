import React from "react";
import { Box } from "@mui/material";

const PackageBreadcrumb = ({ children }) => {
  return (
    <Box
      sx={{
        height: 50,
        padding: 2,
        color: "white",
        marginTop: "25px",
        textAlign: "center",
        borderRadius: "8px",
        marginBottom: "20px",
        justifyContent: "center",
        backgroundColor: "#eeedf0",
        "&:hover": {
          backgroundColor: "#f2edf7",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default PackageBreadcrumb;
