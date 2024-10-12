import "jspdf-autotable";
import jsPDF from "jspdf";
import Cookie from "js-cookie";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { BsPerson } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import userHeader from "../constants/user";
import UserService from "../service/UserService";
import AddUser from "../components/Users/AddUser";
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import csvUserheaders from "../constants/csvUserheaders";
import CommonTable from "../components/common/CommonTable";
import PackageButton from "../components/common/PackageButton";
import CustomSearchField from "../components/common/SearchField";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const User = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const access_token = Cookie.get("mrcs_cookie");

  const handleClick = () => {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    pdf.autoTable({ html: "#user" });

    pdf.save("usersdata.pdf");
  };

  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const fetchData = async () => {
    setIsLoading(true);

    const res = await UserService.getUsers(access_token);

    setData(res.data);
    setIsLoading(false);
  };

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <BsPerson size={23} className="min-w-max text-gray-500" />
              &nbsp; User
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
              filename="Userdata.csv"
              headers={csvUserheaders}
            >
              <LoadingButton
                sx={{
                  width: "75px",
                  height: "30px",
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
              color={"primary"}
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
            sx={{
              textAlign: "right",
              marginBottom: "10px",
              alignContent: "right",
            }}
            onClick={handleOpen}
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
            id={"user"}
            typeData={"user"}
            haveimage={"true"}
            data={filteredData}
            columns={userHeader}
            fetchData={fetchData}
          />
        </div>
      )}

      <AddUser open={open} onClose={handleClose} fetchData={fetchData} />
    </div>
  );
};

export default User;
