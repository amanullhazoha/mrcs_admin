import Cookie from "js-cookie";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { logo } from "../../assets/image";
import AddQuestions from "../Questions/AddQuestions";
import ViewQuestions from "../Questions/ViewQuestions";
import { deleteConfirmation } from "./deleteConfirmation";
import QuestionService from "../../service/QuestionService";
import { MdEdit, MdVisibility, MdDelete } from "react-icons/md";
import {
  Box,
  Paper,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

const ImageTable = ({ id, columns, data, typeData, fetchData }) => {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState(null);

  const access_token = Cookie.get("mrcs_cookie");

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

  const handleQuestionDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await QuestionService.deleteQuestion(id, access_token);

        if (response.status === 200) {
          toast.success("Question Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

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
          aria-label="dynamic table"
          sx={{ minWidth: 650, marginBottom: "30px", width: "100%" }}
        >
          <TableHead sx={{ bgcolor: "#F7F4FC", width: "100%" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "15px",
                  fontWeight: "600",
                  textAlign: "center",
                  color: "#000000",
                }}
              >
                {"ID"}
              </TableCell>
              {columns?.map((column) => (
                <TableCell
                  key={column?.id}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    textAlign: "left",
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
                  fontSize: "15px",
                  fontWeight: "600",
                  textAlign: "center",
                  flexDirection: "row",
                  color: "#000000",
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
                          borderRadius: "10px",
                        }}
                      />
                    </Box>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: data.color,
                      }}
                    >
                      {item?.quizname}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: data.color,
                      }}
                    >
                      {item?.question_name}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: data.color,
                      }}
                    >
                      {item?.qus_description}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ width: "200px" }}>
                    <Stack
                      spacing={0}
                      direction="row"
                      sx={{
                        width: "200px",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div sx={{ ml: 10 }}>
                        <IconButton
                          aria-label="view"
                          onClick={() => handleView(item)}
                        >
                          <MdVisibility style={{ color: "green" }} />
                        </IconButton>
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
          page={page}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 25, 100]}
          sx={{ backgroundColor: "#F7F4FC" }}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {(() => {
        switch (typeData) {
          case "question":
            if (dataType === "question_edit") {
              return (
                <AddQuestions
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "question_view") {
              return (
                <ViewQuestions
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
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

      {/* <CommonModal
        selectedData={selectedData}
        open={open}
        onClose={handleClose}
        typeData={typeData}
      /> */}
    </>
  );
};

export default ImageTable;
