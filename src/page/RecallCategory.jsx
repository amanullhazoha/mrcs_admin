import "jspdf-autotable";
import jsPDF from "jspdf";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { MdSaveAlt } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import categoryHeader from "../constants/category";
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import CommonTable from "../components/common/CommonTable";
import csvCategoryheaders from "../constants/categoryHeaders";
import PackageButton from "../components/common/PackageButton";
import CustomSearchField from "../components/common/SearchField";
import RecallCategoryService from "../service/RecallCategoryService";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import AddRecallCategoryModal from "../components/Category/AddRecallCategory";

const RecallCategory = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const filteredData = data.filter(
    (user) =>
      user.cat_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.cat_status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({ html: "#RecallCategory" });
    pdf.save("RecallCategory.pdf");
  };

  const fetchData = async () => {
    setIsLoading(true);

    const res = await RecallCategoryService.getRecallCategory();

    setData(res?.data);
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
              <BiCategoryAlt size={23} className="min-w-max text-gray-500" />
              &nbsp; Recall Category
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
        <CustomSearchField
          name={"Search by Username or Email"}
          onChange={handleSearchQueryChange}
        />

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
              headers={csvCategoryheaders}
              filename="RecallCategory.csv"
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
          <CommonTable
            id={"recallCategory"}
            columns={categoryHeader}
            data={filteredData}
            typeData={"recallCategory"}
            fetchData={fetchData}
            haveimage={"true"}
          />
        </div>
      )}

      <AddRecallCategoryModal
        open={open}
        onClose={handleClose}
        fetchData={fetchData}
      />
    </div>
  );
};

export default RecallCategory;
