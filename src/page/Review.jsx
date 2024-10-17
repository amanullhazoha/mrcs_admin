import "jspdf-autotable";
import jsPDF from "jspdf";
import Cookie from "js-cookie";
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
import ReviewModal from "../components/review/ReviewModal";
import PackageButton from "../components/common/PackageButton";
import AddQuestions from "../components/Questions/AddQuestions";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const Review = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const access_token = Cookie.get("mrcs_cookie");

  const handleClick = () => {};
  const handleOpen = () => setOpen(true);

  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#imagedata" });
    pdf.save("imageData.pdf");
  };

  const fetchData = async () => {
    setIsLoading(true);

    const res = await ReviewService.getReview(access_token);

    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              Reviews
            </Box>
          </Link>
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

          <Box
            sx={{
              alignContent: "right",
              textAlign: "right",
              marginBottom: "10px",
            }}
            onClick={handleOpen}
          >
            <PackageButton
              color={"green"}
              text={"+ Add"}
              variant={"contained"}
            />
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
            setOpen={setOpen}
            typeData={"question"}
            fetchData={fetchData}
            columns={reviewHeader}
            setSelectedData={setSelectedData}
          />
        </div>
      )}

      <ReviewModal
        isOpen={open}
        fetchData={fetchData}
        selectedData={selectedData}
        onClose={() => setOpen(false)}
        setSelectedData={setSelectedData}
      />
    </div>
  );
};

export default Review;
