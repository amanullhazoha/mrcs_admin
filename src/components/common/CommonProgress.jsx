import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const CommonProgress = () => {
  return (
    <Box
      sx={{
        opacity: 0.9,
        height: "60vh",
        display: "flex",
        background: "white",
        borderRadius: "8px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={70} color="secondary" />
    </Box>
  );
};
