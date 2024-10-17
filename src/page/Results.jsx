import "jspdf-autotable";
import jsPDF from "jspdf";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { MdSaveAlt } from "react-icons/md";
import { AiFillTrophy } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import resultHeader from "../constants/resultHeaders";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import csvImageheaders from "../constants/imageHeaders";
import QuestionService from "../service/QuestionService";
import CommonTable from "../components/common/CommonTable";
import CustomSearchField from "../components/common/SearchField";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const Results = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {};

  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const filteredData = data.filter((result) =>
    result.quizName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({ html: "#resultdata" });
    pdf.save("imageData.pdf");
  };

  const fetchData = async () => {
    setIsLoading(true);

    const res = await QuestionService.getAllResult();

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
              <AiFillTrophy size={23} className="min-w-max text-gray-500" />
              &nbsp; Result
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
        </Box>
      </Stack>

      {isLoading ? (
        <CommonProgress />
      ) : (
        <div className="pt-5">
          <CommonTable
            id={"resultdata"}
            columns={resultHeader}
            data={filteredData}
            typeData={"result"}
            fetchData={fetchData}
          />
        </div>
      )}
    </div>
  );
};

export default Results;
