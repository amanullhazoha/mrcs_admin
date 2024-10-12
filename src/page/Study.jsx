import "jspdf-autotable";
import jsPDF from "jspdf";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { MdSaveAlt } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import StudyService from "../service/StudyService";
import AddStudy from "../components/Study/AddStudy";
import studyHeader from "../constants/studyHeaders";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import CommonTable from "../components/common/CommonTable";
import csvSliderHeader from "../constants/csvSliderHeaders";
import PackageButton from "../components/common/PackageButton";
import CustomSearchField from "../components/common/SearchField";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const Study = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredData = data.filter((study) =>
    study.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({ html: "#slidertable" });

    pdf.save("SliderData.pdf");
  };

  const fetchData = async () => {
    setIsLoading(true);

    const res = await StudyService.getStudy();

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
                &nbsp; Study
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>

        <Stack
          direction={{
            lg: "row",
            md: "row",
            xs: "column",
            sm: "column",
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
                filename="Sliderdata.csv"
              >
                <LoadingButton
                  sx={{
                    height: "30px",
                    width: "75px",
                    textAlign: "left",
                    alignContent: "left",
                    mt: { lg: "6px", md: "6px" },
                    ml: { lg: "10px", md: "6px" },
                  }}
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={handleClick}
                  loadingPosition="start"
                  disabled={data ? false : true}
                  startIcon={<MdSaveAlt size={25} />}
                >
                  <span>csv</span>
                </LoadingButton>
              </CSVLink>

              <LoadingButton
                sx={{
                  width: "75px",
                  height: "30px",
                  textAlign: "left",
                  alignContent: "left",
                  mt: { lg: "6px", md: "6px" },
                  ml: { lg: "10px", md: "6px", sm: "4px" },
                }}
                size="small"
                color="primary"
                variant="contained"
                loadingPosition="start"
                onClick={handleDownloadPDF}
                disabled={data ? false : true}
                startIcon={<MdSaveAlt size={25} />}
              >
                <span>pdf</span>
              </LoadingButton>
            </Box>

            <Box
              onClick={handleOpen}
              sx={{
                textAlign: "right",
                marginBottom: "10px",
                alignContent: "right",
              }}
            >
              <PackageButton
                text={"+ Add"}
                color={"green"}
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
              typeData={"study"}
              haveimage={"true"}
              data={filteredData}
              columns={studyHeader}
              fetchData={fetchData}
            />
          </div>
        )}

        <AddStudy open={open} onClose={handleClose} fetchData={fetchData} />
      </div>
    </>
  );
};

export default Study;
