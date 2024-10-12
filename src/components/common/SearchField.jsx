import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { FiSearch } from "react-icons/fi";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

export default function CustomSearchField({ name, onChange }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Paper
      component="form"
      width={{
        lg: 320,
        md: 250,
        xs: "100%",
        sm: "100%",
      }}
      sx={{
        p: "2px 4px",
        mb: "8px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        width: { xs: "100%", sm: "100%", lg: 400, md: 300 },
        "&:hover": {
          backgroundColor: "#f7f5ff",
        },
      }}
    >
      <InputBase
        value={value}
        onChange={handleChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder={`${name}`}
        inputProps={{ "aria-label": "Search Information " }}
      />
      <IconButton type="button" sx={{ p: "8px" }} aria-label="search">
        <FiSearch />
      </IconButton>
    </Paper>
  );
}
