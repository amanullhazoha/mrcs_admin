import Cookie from "js-cookie";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { Progress } from "../common/Progress";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UserService from "../../service/UserService";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import signupValidationSchema from "../../utils/validation/signupValidation";
import {
  Box,
  Chip,
  Fade,
  Modal,
  Stack,
  Select,
  Divider,
  Backdrop,
  MenuItem,
  Typography,
  InputLabel,
  IconButton,
  FormControl,
} from "@mui/material";

const style = {
  p: 4,
  top: "50%",
  left: "50%",
  width: "450px",
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: "10px",
  position: "absolute",
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  transform: "translate(-50%,-50%)",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
};

const AddUser = ({ open, onClose, data, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const access_token = Cookie.get("access_token");

  const handleResetAndClose = (resetForm) => {
    onClose();

    fetchData();

    resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setIsLoading(true);

      const response = await UserService.addUser(values);

      if (response.status === 200) {
        const responseData = response.data;

        if (responseData.error) {
          toast.error(responseData.error.message);

          const errorData = responseData.error;

          if (errorData.errors) {
            const errors = Object.keys(errorData.errors).reduce((acc, key) => {
              acc[key] = errorData.errors[key].msg;

              return acc;
            }, {});

            setErrors(errors);
          }
        } else {
          toast.success("Successfully Add User");

          onClose();

          fetchData();

          setIsLoading(false);
        }

        setSubmitting(false);
      }
    } catch (err) {
      if (err.response) {
        const errorData = err.response.data;

        toast.error(errorData.message);

        if (errorData.errors) {
          const errors = Object.keys(errorData.errors).reduce((acc, key) => {
            acc[key] = errorData.errors[key].msg;

            return acc;
          }, {});

          setErrors(errors);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleUpdate = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await UserService.updateUser(
        data._id,
        values,
        access_token
      );

      if (response.status === 200) {
        toast.success("Successfully Update User");

        setSubmitting(false);

        onClose();

        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong");

      setErrors(err);
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={false}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div>
            <Formik
              initialValues={{
                role: data ? data?.role : "",
                name: data ? data?.name : "",
                email: data ? data?.email : "",
                mobile: data ? data?.mobile : "",
                password: data ? data?.password : "",
                usertype: data ? data?.usertype : "",
                planExpiryDate: data ? data?.planExpiryDate : "",
              }}
              validationSchema={signupValidationSchema}
              onSubmit={data ? handleUpdate : handleSubmit}
            >
              {({
                errors,
                values,
                touched,
                resetForm,
                handleChange,
                isSubmitting,
              }) => (
                <Form>
                  <Box
                    sx={{
                      pb: 0,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h5" component="h5">
                      {data ? "Update " : "Add "} Users
                    </Typography>
                    <div style={{}}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleResetAndClose(resetForm)}
                      >
                        <AiOutlineCloseCircle
                          sx={{
                            color: "#ff4a68",
                            height: "22px",
                            width: "22px",
                          }}
                          className="text-red-400 hover:text-600"
                        />
                      </IconButton>
                    </div>
                  </Box>

                  <Divider sx={{ mb: 2 }}>
                    <Chip label="User" />
                  </Divider>

                  <div className="">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      User Name
                    </label>

                    <div className="mt-1 ">
                      <Field
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Enter your Name"
                        error={touched.name && errors.name}
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.name && errors.name
                                        ? "border-red-500"
                                        : ""
                                    }`}
                      />

                      {touched.name && errors.name && (
                        <p className="mt-2 text-sm text-red-600 ">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>

                    <div className="mt-1">
                      <Field
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && errors.email}
                        placeholder="Enter your Email Address"
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.email && errors.email
                                        ? "border-red-500"
                                        : ""
                                    }`}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-2 text-sm text-red-600 ">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile
                    </label>

                    <div className="mt-1">
                      <Field
                        id="mobile"
                        type="mobile"
                        name="mobile"
                        autoComplete="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        placeholder="Enter your Mobile Number"
                        error={touched.mobile && errors.mobile}
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.mobile && errors.mobile
                                        ? "border-red-500"
                                        : ""
                                    }`}
                      />

                      {touched.mobile && errors.mobile && (
                        <p className="mt-2 text-sm text-red-600 ">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <div className="mt-1">
                      <div className="relative">
                        <Field
                          id="password"
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          autoComplete="current-password"
                          placeholder="Enter your Password"
                          type={showPassword ? "text" : "password"}
                          error={touched.password && errors.password}
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                      rounded-md shadow-sm placeholder-gray-400 
                      focus:ring-yellow-500 focus:border-yellow-500 focus:ring-1 sm:text-sm ${
                        touched.password && errors.password
                          ? "border-red-500"
                          : ""
                      }`}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center px-2"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-2 text-sm text-red-600"
                      />
                    </div>
                  </div>

                  <Stack direction={"column"} spacing={1.5} sx={{ pt: 2 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                      Input User Type (Paid or Unpaid)
                    </Typography>

                    <FormControl>
                      <InputLabel id="select-label">Type</InputLabel>

                      <Select
                        label="Type"
                        name="usertype"
                        id="select-label"
                        labelId="select-label"
                        value={values.usertype}
                        onChange={handleChange}
                        placeholder="Input User Type"
                      >
                        <MenuItem value="paid">Paid</MenuItem>

                        <MenuItem value="unpaid">Unpaid</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  <div className="mt-3">
                    <label
                      htmlFor="planExpiryDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Plan Expiry Date
                    </label>

                    <div className="mt-1">
                      <Field
                        type="date"
                        id="planExpiryDate"
                        name="planExpiryDate"
                        onChange={handleChange}
                        autoComplete="planExpiryDate"
                        error={touched.planExpiryDate && errors.planExpiryDate}
                        value={
                          values.planExpiryDate
                            ? new Date(values.planExpiryDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.planExpiryDate &&
                                      errors.planExpiryDate
                                        ? "border-red-500"
                                        : ""
                                    }`}
                      />

                      {touched.planExpiryDate && errors.planExpiryDate && (
                        <p className="mt-2 text-sm text-red-600 ">
                          {errors.planExpiryDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <Stack direction={"column"} spacing={1.5} sx={{ pt: 2 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                      Input Role
                    </Typography>

                    <FormControl>
                      <InputLabel id="select-label">Role</InputLabel>

                      <Select
                        name="role"
                        label="Role"
                        id="select-label"
                        value={values.role}
                        labelId="select-label"
                        onChange={handleChange}
                        placeholder="Input User Role"
                      >
                        <MenuItem value="user">User</MenuItem>

                        <MenuItem value="admin">Admin</MenuItem>

                        <MenuItem value="superadmin">SuperAdmin</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        {isLoading ? (
                          <Progress />
                        ) : (
                          <BiLockAlt
                            className="h-5 w-5 text-gray-600 group-hover:text-yellow-400"
                            aria-hidden="true"
                          />
                        )}
                      </span>

                      {data ? "Update User" : "Add User"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddUser;
