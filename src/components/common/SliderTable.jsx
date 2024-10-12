import Cookie from "js-cookie";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddSlider from "../Slider/AddSlider";
import ViewSlider from "../Slider/ViewSlider";
import ImageService from "../../service/ImageService";
import SliderService from "../../service/SliderService";
import { deleteConfirmation } from "./deleteConfirmation";
import { MdEdit, MdVisibility, MdDelete } from "react-icons/md";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

const SliderTable = ({ id, columns, data, typeData, fetchData }) => {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState(null);

  const access_token = Cookie.get("mrcs_cookie");

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

  const handleView = (item) => {
    switch (typeData) {
      case "image":
        setDataType("image_view");

        setOpen(true);
        setSelectedData(item);
        break;
      case "slider":
        setDataType("slider_view");

        setOpen(true);
        setSelectedData(item);
        break;
      default:
        return "Not Found!";
    }
  };

  const handleSliderDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await SliderService.deleteSlider(id, access_token);

        if (response.status === 200) {
          toast.success("Slider Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleImageDelete = async (id) => {
    try {
      const result = await deleteConfirmation();

      if (result.isConfirmed) {
        const response = await ImageService.deleteImage(id);

        if (response.status === 200) {
          toast.success("Slider Deleted Successfully!");

          fetchData();
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    switch (typeData) {
      case "image":
        handleImageDelete(id);
        break;
      case "slider":
        handleSliderDelete(id);
        break;
      default:
        return "Not Found!";
    }
  };

  const handleEdit = (item) => {
    switch (typeData) {
      case "image":
        setDataType("image_edit");

        setOpen(true);
        setSelectedData(item);
        break;
      case "slider":
        setDataType("slider_edit");

        setOpen(true);
        setSelectedData(item);
        break;
      default:
        return "Not Found!";
    }
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
                  fontSize: "13px",
                  fontWeight: "500",
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
                    textAlign: "left",
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
                  fontSize: "13px",
                  fontWeight: "500",
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
                        padding: "3px",
                        overflow: "hidden",
                        borderRadius: "10px",
                        background: "#f2f2f2",
                      }}
                    >
                      <img
                        alt=""
                        src={item?.imageUrl}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: item?.status === "active" ? "green" : "red",
                      }}
                    >
                      {item?.status}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ width: "200px" }}>
                    <Typography
                      sx={{
                        color: item?.status === "active" ? "green" : "red",
                      }}
                    >
                      {item?.text}
                    </Typography>
                  </TableCell>

                  {item?.link ? (
                    <TableCell sx={{}}>
                      <Typography
                        sx={{
                          color: "blue",
                        }}
                      >
                        <Link to={item.link}>{item?.link}</Link>
                      </Typography>
                    </TableCell>
                  ) : (
                    ""
                  )}

                  <TableCell sx={{}}>
                    <Stack
                      spacing={0}
                      direction="row"
                      sx={{ textAlign: "center", justifyContent: "center" }}
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
          case "slider":
            if (dataType === "slider_edit") {
              return (
                <AddSlider
                  open={open}
                  data={selectedData}
                  fetchData={fetchData}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "slider_view") {
              return (
                <ViewSlider
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
    </>
  );
};

export default SliderTable;
