import "jspdf-autotable";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineControl } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import controlHeader from "../constants/controlpanel";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import CommonTable from "../components/common/CommonTable";
import csvCategoryheaders from "../constants/categoryHeaders";
import PackageButton from "../components/common/PackageButton";
import AddPanelModal from "../components/controlpanel/AddPanel";
import ControlPanelService from "../service/ControlPanelService";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const ControlPanel = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {};

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({ html: "#HomeSettings" });
    pdf.save("HomeSettings.pdf");
  };

  const fetchData = async () => {
    setIsLoading(true);

    const res = await ControlPanelService.getControl();

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
              <AiOutlineControl size={23} className="min-w-max text-gray-500" />
              &nbsp; Control Panel
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
              headers={csvCategoryheaders}
              filename="Control.csv"
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
              variant="contained"
              loadingPosition="start"
              onClick={handleDownloadPDF}
              startIcon={<MdSaveAlt size={25} />}
              disabled={data ? false : true}
            >
              <span>pdf</span>
            </LoadingButton>
          </Box>

          {data?.length >= 2 ? (
            ""
          ) : (
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
          )}
        </Box>
      </Stack>

      {isLoading ? (
        <CommonProgress />
      ) : (
        <div className="pt-5">
          <CommonTable
            data={data}
            id={"control"}
            haveimage={"true"}
            typeData={"control"}
            fetchData={fetchData}
            columns={controlHeader}
          />
        </div>
      )}

      <AddPanelModal open={open} onClose={handleClose} fetchData={fetchData} />
    </div>
  );
};

export default ControlPanel;
