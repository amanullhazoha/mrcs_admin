import React from "react";
import { Switch } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  Box,
  Chip,
  Fade,
  Modal,
  Divider,
  Backdrop,
  IconButton,
  Typography,
} from "@mui/material";

const style = {
  p: 4,
  top: "50%",
  left: "50%",
  position: "absolute",
  borderRadius: "10px",
  bgcolor: "background.paper",
  width: ["90%", "90%", "50%"],
  border: "2px solid #F7FDFF",
  transform: "translate(-50%,-50%)",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
};
const ViewUser = ({ open, onClose, data, fetchData }) => {
  const handleResetAndClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={false}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            sx={{
              pb: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h5">
              View User
            </Typography>

            <div style={{}}>
              <IconButton
                aria-label="edit"
                onClick={() => handleResetAndClose()}
              >
                <AiOutlineCloseCircle
                  sx={{ color: "#ff4a68", height: "22px", width: "22px" }}
                  className="text-red-400 hover:text-600"
                />
              </IconButton>
            </div>
          </Box>

          <Divider sx={{ mb: 2 }}>
            <Chip label="view user" />
          </Divider>

          <div className="space-y-6 mx-auto max-w-md">
            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                User Name :
              </label>

              <div>{data?.name} </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                Email :
              </label>

              <div>{data?.email} </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number :
              </label>

              <div>{data?.mobile} </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                User Role :
              </label>

              <div className="bg-indigo-400 rounded-md px-4 py-1 ">
                {data?.role}{" "}
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewUser;
