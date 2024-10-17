import "jspdf-autotable";
import jsPDF from "jspdf";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { MdSaveAlt } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import recallHeader from "../constants/recallHeader";
import RecallService from "../service/RecallService";
import AddRecall from "../components/Recall/addRecall";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import CommonTable from "../components/common/CommonTable";
import csvSliderHeader from "../constants/csvSliderHeaders";
import PackageButton from "../components/common/PackageButton";
import CustomSearchField from "../components/common/SearchField";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const Recall = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const filteredData = data.filter((study) =>
    study.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({ html: "#slidertable" });
    pdf.save("RecallData.pdf");
  };

  const fetchData = async () => {
    setIsLoading(true);

    const res = await RecallService.getRecall();

    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <GiBlackBook size={23} className="min-w-max text-gray-500" />
                &nbsp; Recall
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
                headers={csvSliderHeader}
                filename="Recalldata.csv"
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
              id={"studytable"}
              columns={recallHeader}
              data={filteredData}
              typeData={"recall"}
              fetchData={fetchData}
              haveimage={"true"}
            />
          </div>
        )}

        <AddRecall open={open} onClose={handleClose} fetchData={fetchData} />
      </div>
    </>
  );
};

export default Recall;
