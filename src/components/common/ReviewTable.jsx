import { MdEdit, MdVisibility, MdDelete } from "react-icons/md";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

import AddQuestions from "../Questions/AddQuestions";
import ViewQuestions from "../Questions/ViewQuestions";
import QuestionService from "../../service/QuestionService";
import { deleteConfirmation } from "./deleteConfirmation";
import { logo } from "../../assets/image";

const ReviewTable = ({ id, columns, data, typeData, fetchData }) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataType, setDataType] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Open Usb Modal Function ....
  const handleView = (item) => {
    switch (typeData) {
      case "question":
        setDataType("question_view");
        setOpen(true);
        setSelectedData(item);
        break;
      case "slider":
        setDataType("slider_view");
        setOpen(true);
        setSelectedData(item);
        break;
      default:
        return "Not Found !";
    }
  };

  // For Image Deleted Function Call.....
  const handleQuestionDelete = async (id) => {
    try {
      const result = await deleteConfirmation();
      if (result.isConfirmed) {
        const response = await QuestionService.deleteQuestion(id);

        if (response.status === 200) {
          toast.success("Question Deleted Successfully !");
          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };

  // Global HandleDelete For Any Tables
  const handleDelete = async (id) => {
    switch (typeData) {
      case "question":
        handleQuestionDelete(id);
        break;

      default:
        return "Not Found !";
    }
  };

  const handleEdit = (item) => {
    switch (typeData) {
      case "question":
        // return navigate(`/package/edit/${id}`);
        setDataType("question_edit");
        setOpen(true);
        setSelectedData(item);
        break;

      default:
        return "Not Found !";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          id={id}
          sx={{ minWidth: 650, marginBottom: "30px", width: "100%" }}
          aria-label="dynamic table"
        >
          <TableHead sx={{ bgcolor: "#F7F4FC", width: "100%" }}>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#000000",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {"ID"}
              </TableCell>
              {columns?.map((column) => (
                <TableCell
                  key={column?.id}
                  sx={{
                    textAlign: "left",

                    fontSize: "16px",
                    fontWeight: "600",
                    color: column?.color,
                  }}
                >
                  <Typography sx={{ color: column?.color }}>
                    {column?.label}
                  </Typography>
                </TableCell>
              ))}
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#000000",
                  fontSize: "15px",
                  fontWeight: "600",
                  flexDirection: "row",
                }}
              >
                {"Actions"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontWeight: "500", color: "black" }}>
                      {index + 1}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Box
                      sx={{
                        width: "80px",
                        height: "80px",
                        overflow: "hidden",
                        padding: "3px",
                        background: "#f2f2f2",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={item?.image ? item?.image : logo}
                        alt="quiz"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                          borderRadius:"10px"
                         
                        }} // Adjust styles as needed
                      />
                    </Box>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: data.color,
                      }}
                    >
                      {item?.user_name}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: data.color,
                      }}
                    >
                      {item?.review}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: data.color,
                      }}
                    >
                      {item?.rating}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: data.color,
                      }}
                    >
                      {item?.status}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ width: "200px" }}>
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        textAlign: "center",
                        justifyContent: "center",
                        width: "200px",
                      }}
                    >
                      <div sx={{ ml: 10 }}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(item)}
                        >
                          <MdEdit style={{ color: "blue" }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(item?._id)}
                        >
                          <MdDelete style={{ color: "red" }} />
                        </IconButton>
                      </div>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: "#F7F4FC" }}
        />
      </TableContainer>

      {(() => {
        switch (typeData) {
          case "question":
            if (dataType === "question_edit") {
              return (
                <AddQuestions
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;
          default:
            return (
              <Box>
                <Typography>No Data Availavle;</Typography>
              </Box>
            );
        }
      })()}
    </>
  );
};

export default ReviewTable;
