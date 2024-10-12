import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  Box,
  Chip,
  Fade,
  Modal,
  Divider,
  Backdrop,
  Typography,
  IconButton,
} from "@mui/material";

const style = {
  p: 4,
  top: "50%",
  left: "50%",
  overflow: "auto",
  maxHeight: "90vh",
  position: "absolute",
  borderRadius: "10px",
  bgcolor: "background.paper",
  width: ["90%", "90%", "50%"],
  border: "2px solid #F7FDFF",
  transform: "translate(-50%,-50%)",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
};

const ViewQuestions = ({ open, onClose, data, fetchData }) => {
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
              View Question
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
            <Chip label="view question" />
          </Divider>

          <div className="space-y-6 mx-10 justify-center text-center">
            {data?.image && (
              <div className="my-4 rounded-md">
                <label htmlFor="image">Image</label>

                <div className="mt-1 flex border flex-col justify-center items-center space-x-2 p-10 bg-white rounded-md h-100vh">
                  <div className="rounded-md bg-gray-100 p-3 mb-5 flex items-center justify-center">
                    <img
                      src={data?.image}
                      alt="Preview"
                      style={{ height: "100px", marginTop: "10px" }}
                      className="w-full h-full rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between ">
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quiz Name :
                </label>

                <div className="bg-violet-200 text-gray-700 rounded-xl px-10 py-1 ">
                  {data?.quizname}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Question Name :
                </label>

                <div className=" rounded-xl px-4 py-1 ">
                  {data?.question_name}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options Name :
                </label>

                <div className="lg:grid-cols-3 grid sm:grid-cols-2 gap-2">
                  <span className="px-4 py-1 bg-amber-50  mr-2 rounded-md">
                    {data?.options[0]?.option_a}
                  </span>

                  <span className="px-4 py-1 bg-amber-50  mr-2 rounded-md">
                    {data?.options[0]?.option_b}
                  </span>

                  <span className="px-4 py-1 bg-amber-50  mr-2 rounded-md">
                    {data?.options[0]?.option_c}
                  </span>

                  <span className="px-4 py-1 bg-amber-50  mr-2 rounded-md">
                    {data?.options[0]?.option_d}
                  </span>

                  <span className="px-4 py-1 bg-amber-50  mr-2 rounded-md">
                    {data?.options[0]?.option_e}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                Answer :
              </label>

              <div className="  px-4 py-1 bg-violet-100 rounded-md ">
                {data?.answer}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                Question Description :
              </label>

              <div className="  px-4 py-1 ">{data?.qus_description}</div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewQuestions;
