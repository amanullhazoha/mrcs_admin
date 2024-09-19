import "jspdf-autotable";
import jsPDF from "jspdf";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { MdSaveAlt } from "react-icons/md";
import React, { useEffect, useState } from "react";
import ReviewService from "../service/ReviewService";
import reviewHeader from "../constants/reviewHeader";
import csvImageheaders from "../constants/imageHeaders";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import ReviewTable from "../components/common/ReviewTable";
import AddQuestions from "../components/Questions/AddQuestions";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const Review = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {};

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await ReviewService.getReview();
    setData(res.data);
    setIsLoading(false);
  };
  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#imagedata" });
    pdf.save("imageData.pdf");
  };
  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              Reviews
            </Box>
          </Link>
          {/* <Typography color="grey">sdfgh</Typography> */}
        </Breadcrumbs>
      </PackageBreadcrumb>
      <Stack
        direction={{
          lg: "row",
          xs: "column",
          sm: "column",
          md: "row",
        }}
        justifyContent={"space-between"}
      >
        <Box
          sx={{
            display: "flex",
            width: { sm: "100%", xs: "100%" },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <CSVLink
              data={data}
              headers={csvImageheaders}
              filename="Imagedata.csv"
            >
              <LoadingButton
                sx={{
                  height: "30px",
                  width: "75px",
                  mt: { lg: "6px", md: "6px" },
                  ml: { lg: "10px", md: "6px" },
                  alignContent: "left",
                  textAlign: "left",
                }}
                size="small"
                color="secondary"
                onClick={handleClick}
                // loading={loading}
                loadingPosition="start"
                startIcon={<MdSaveAlt size={25} />}
                variant="contained"
                disabled={data ? false : true}
              >
                <span>csv</span>
              </LoadingButton>
            </CSVLink>
            <LoadingButton
              sx={{
                height: "30px",
                width: "75px",
                mt: { lg: "6px", md: "6px" },
                ml: { lg: "10px", md: "6px", sm: "4px" },
                alignContent: "left",
                textAlign: "left",
              }}
              size="small"
              color="primary"
              onClick={handleDownloadPDF}
              // loading={loading}
              loadingPosition="start"
              startIcon={<MdSaveAlt size={25} />}
              variant="contained"
              disabled={data ? false : true}
            >
              <span>pdf</span>
            </LoadingButton>
          </Box>
        </Box>
      </Stack>
      {isLoading ? (
        <CommonProgress />
      ) : (
        <div className="pt-5">
          <ReviewTable
            data={data}
            id={"imagedata"}
            typeData={"question"}
            fetchData={fetchData}
            columns={reviewHeader}
          />
        </div>
      )}

      <AddQuestions open={open} onClose={handleClose} fetchData={fetchData} />
    </div>
  );
};

export default Review;
