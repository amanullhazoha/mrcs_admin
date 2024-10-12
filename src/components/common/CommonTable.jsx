import Cookie from "js-cookie";
import { toast } from "react-toastify";
import AddUser from "../Users/AddUser";
import React, { useState } from "react";
import AddQuiz from "../Quizes/AddQuiz";
import AddStudy from "../Study/AddStudy";
import ViewUser from "../Users/ViewUser";
import ViewQuiz from "../Quizes/ViewQuiz";
import { logo } from "../../assets/image";
import ViewStudy from "../Study/ViewStudy";
import AddRecall from "../Recall/addRecall";
import ViewRecall from "../Recall/ViewRecall";
import { useNavigate } from "react-router-dom";
import UserService from "../../service/UserService";
import QuizService from "../../service/QuizService";
import AddPanelModal from "../controlpanel/AddPanel";
import StudyService from "../../service/StudyService";
import AddCategoryModal from "../Category/AddCategory";
import ViewPanelModal from "../controlpanel/ViewPanel";
import RecallService from "../../service/RecallService";
import ViewCategoryModal from "../Category/ViewCategory";
import { deleteConfirmation } from "./deleteConfirmation";
import CategoryService from "../../service/CategoryService";
import { MdEdit, MdVisibility, MdDelete } from "react-icons/md";
import AddRecallCategoryModal from "../Category/AddRecallCategory";
import ControlPanelService from "../../service/ControlPanelService";
import ViewRecallCategoryModal from "../Category/ViewRecallCategory";
import RecallCategoryService from "../../service/RecallCategoryService";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

const CommonTable = ({ columns, data, typeData, fetchData, id, haveimage }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState(null);

  const access_token = Cookie.get("mrcs_cookie");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCategoryDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await CategoryService.deleteCategory(id, access_token);

        if (response.status === 200) {
          toast.success("Category Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleRecallCategoryDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await RecallCategoryService.deleteRecallCategory(
          id,
          access_token
        );

        if (response.status === 200) {
          toast.success("Recall Category Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleUserDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await UserService.deleteUser(id, access_token);

        if (response.status === 200) {
          toast.success("User Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleActivityDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await UserService.deleteActivity(id, access_token);

        if (response.status === 200) {
          toast.success("User Activity Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleQuizDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await QuizService.deleteQuiz(id, access_token);

        if (response.status === 200) {
          toast.success("Quiz Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleStudyDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await StudyService.deleteStudy(id, access_token);

        if (response.status === 200) {
          toast.success("Study  Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleRecallDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await RecallService.deleteRecall(id, access_token);

        if (response.status === 200) {
          toast.success("Recall Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleControlDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await ControlPanelService.deleteControl(
          id,
          access_token
        );

        if (response.status === 200) {
          toast.success("Control Settings Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleClick = (item) => {
    switch (typeData) {
      case "user":
        setDataType("user_view");
        setOpen(true);

        setSelectedData(item);
        break;
      case "activity":
        setDataType("act_view");
        setOpen(true);

        setSelectedData(item);
        break;

      case "category":
        setDataType("cat_view");
        setOpen(true);

        setSelectedData(item);
        break;

      case "recallCategory":
        setDataType("recall_cat_view");
        setOpen(true);

        setSelectedData(item);
        break;

      case "quiz":
        setDataType("quiz_view");
        setOpen(true);

        setSelectedData(item);
        break;
      case "control":
        setDataType("control_view");
        setOpen(true);

        setSelectedData(item);
        break;
      case "study":
        setDataType("study_view");
        setOpen(true);

        setSelectedData(item);
        break;
      case "recall":
        setDataType("recall_view");
        setOpen(true);

        setSelectedData(item);
        break;
      case "result":
        navigate(`/results/viewresult/${item?._id}`);
        break;
      default:
        return "Not Found !";
    }
  };

  const handleDelete = async (id) => {
    switch (typeData) {
      case "user":
        handleUserDelete(id);
        break;
      case "activity":
        handleActivityDelete(id);
        break;
      case "category":
        handleCategoryDelete(id);
        break;
      case "recallCategory":
        handleRecallCategoryDelete(id);
        break;
      case "quiz":
        handleQuizDelete(id);
        break;
      case "control":
        handleControlDelete(id);
        break;
      case "study":
        handleStudyDelete(id);
        break;
      case "recall":
        handleRecallDelete(id);
        break;

      default:
        return "Not Found !";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (item) => {
    switch (typeData) {
      case "user":
        setDataType("user_edit");
        setOpen(true);

        setSelectedData(item);
        break;
      case "activity":
        setDataType("act_edit");
        setOpen(true);

        setSelectedData(item);
        break;
      case "control":
        setDataType("control_edit");
        setOpen(true);

        setSelectedData(item);
        break;
      case "category":
        setDataType("cat_edit");
        setOpen(true);

        setSelectedData(item);
        break;
      case "recallCategory":
        setDataType("recall_cat_edit");
        setOpen(true);

        setSelectedData(item);
        break;
      case "quiz":
        setDataType("quiz_edit");
        setOpen(true);

        setSelectedData(item);
        break;
      case "study":
        setDataType("study_edit");
        setOpen(true);

        setSelectedData(item);
        break;
      case "recall":
        setDataType("recall_edit");
        setOpen(true);

        setSelectedData(item);
        break;

      default:
        return "Not Found !";
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          id={id}
          aria-label="dynamic table"
          sx={{ minWidth: 650, marginBottom: "30px" }}
        >
          <TableHead sx={{ bgcolor: "#F7F4FC" }}>
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

              {haveimage === "true" ? (
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  {"Image"}
                </TableCell>
              ) : (
                ""
              )}

              {columns?.map((column) => (
                <TableCell
                  key={column?.id}
                  sx={{
                    fontSize: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    color: column?.color,
                  }}
                >
                  <Typography sx={{ color: "black" }}>
                    {column?.label}
                  </Typography>
                </TableCell>
              ))}

              {typeData === "activity" ? (
                ""
              ) : (
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
              )}
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

                  {haveimage === "true" ? (
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
                          src={
                            item?.image ? item?.image : item?.profile || logo
                          }
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                    </TableCell>
                  ) : (
                    ""
                  )}

                  {columns?.map((column) => (
                    <TableCell
                      key={column?.id}
                      sx={{
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        sx={
                          column.id === "quiz_status" ||
                          column.id === "cat_status" ||
                          column.id === "status" ||
                          column.id === "usertype" ||
                          column.id === "accessibility"
                            ? {
                                fontSize: "13px",
                                backgroundColor:
                                  item[column.id] === "active" ||
                                  item[column.id] === "paid"
                                    ? "green"
                                    : "red",
                                color: "white",
                                width: "100px",
                                paddingX: "2px",
                                paddingY: "2px",
                                alignItems: "left",
                                textAlign: "center",
                                borderRadius: "16px",
                                justifyContent: "left",
                                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                              }
                            : {
                                fontSize: "13px",
                                fontWeight: "500",
                                color: column.color,
                                backgroundColor: "white",
                              }
                        }
                      >
                        {item[column?.id]}
                      </Typography>
                    </TableCell>
                  ))}
                  {typeData === "activity" ? (
                    ""
                  ) : (
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
                            onClick={() => handleClick(item)}
                          >
                            <MdVisibility style={{ color: "green" }} />
                          </IconButton>
                          {typeData === "result" ? (
                            ""
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
                      </Stack>
                    </TableCell>
                  )}
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
          case "category":
            if (dataType === "cat_edit") {
              return (
                <AddCategoryModal
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "cat_view") {
              return (
                <ViewCategoryModal
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            break;

          case "recallCategory":
            if (dataType === "recall_cat_edit") {
              return (
                <AddRecallCategoryModal
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "recall_cat_view") {
              return (
                <ViewRecallCategoryModal
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            break;

          case "user":
            if (dataType === "user_edit") {
              return (
                <AddUser
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "user_view") {
              return (
                <ViewUser
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;
          // return <UserModal selectedData={selectedData} onClose={onClose} />;
          case "quiz":
            if (dataType === "quiz_edit") {
              return (
                <AddQuiz
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "quiz_view") {
              return (
                <ViewQuiz
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            break;
          case "study":
            if (dataType === "study_edit") {
              return (
                <AddStudy
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "study_view") {
              return (
                <ViewStudy
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            break;
          case "recall":
            if (dataType === "recall_edit") {
              return (
                <AddRecall
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "recall_view") {
              return (
                <ViewRecall
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            break;
          case "control":
            if (dataType === "control_edit") {
              return (
                <AddPanelModal
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "control_view") {
              return (
                <ViewPanelModal
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            break;
          default:
            return "";
        }
      })()}
    </>
  );
};

export default CommonTable;
