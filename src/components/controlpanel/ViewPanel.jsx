import React from "react";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Box, Chip, Divider, IconButton } from "@mui/material";

const style = {
  p: 4,
  top: "50%",
  left: "50%",
  position: "absolute",
  borderRadius: "10px",
  bgcolor: "background.paper",
  width: ["90%", "90%", "30%"],
  border: "2px solid #F7FDFF",
  transform: "translate(-50%,-50%)",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
};

const ViewPanelModal = ({ open, onClose, data, fetchData }) => {
  const handleResetAndClose = () => {
    fetchData();
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
              View Control Panel
            </Typography>

            <div>
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
            <Chip label="View Panel" />
          </Divider>

          <div className="space-y-6 mx-auto max-w-md">
            <div className="block text-sm font-medium text-gray-700">
              <span className="text-xl pr-5 ">Panel :</span>

              <span className="text-xl text-blue-500">{data?.title}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xl pr-5 ">Status :</span>

              {data.status === "active" ? (
                <span className="text-xl text-green-500 bg-gray-100 p-1 w-32 text-center rounded-xl">
                  {data?.status}
                </span>
              ) : (
                <span className="text-xl text-red-500 bg-gray-100 p-1 w-32 text-center rounded-xl">
                  {data?.status}
                </span>
              )}

              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              ></label>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewPanelModal;
