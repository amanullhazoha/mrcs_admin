import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { Switch } from "@mui/material";
import React, { useState } from "react";
import { Progress } from "../common/Progress";
import SliderService from "../../service/SliderService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import sliderValidationSchema from "../../utils/validation/sliderValidation";
import {
  Box,
  Chip,
  Fade,
  Modal,
  Divider,
  Backdrop,
  IconButton,
  Typography,
} from "@mui/material";

const style = {
  top: "50%",
  left: "50%",
  position: "absolute",
  borderRadius: "10px",
  bgcolor: "background.paper",
  width: ["90%", "90%", "50%"],
  border: "2px solid #F7FDFF",
  transform: "translate(-50%,-50%)",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
};
const AddSlider = ({ open, onClose, data, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(data ? data.imageUrl : "");

  const access_token = Cookie.get("mrcs_cookie");

  const handleResetAndClose = (resetForm) => {
    fetchData();

    onClose();

    resetForm();

    setPreviewImage("");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("link", values.link);
      formData.append("text", values.text);
      formData.append("image", values.image);
      formData.append("status", values.status);

      await SliderService.addSlider(formData, access_token);

      toast.success("Add Successfully");

      fetchData();

      onClose();
    } catch (error) {
      toast.error("Something went wrong uploading ");
    }

    setIsLoading(false);
    setSubmitting(false);
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("link", values.link);
      formData.append("text", values.text);
      formData.append("image", values.image);
      formData.append("status", values.status);

      const response = await SliderService.updateSlider(
        data?._id,
        formData,
        access_token
      );

      toast.success("Update Successfully");

      fetchData();

      onClose();
    } catch (error) {
      toast.error("Something went wrong uploading ");
    }

    setIsLoading(false);
    setSubmitting(false);
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
          <Formik
            initialValues={{
              text: data ? data?.text : "",
              image: data ? data?.imageUrl : "",
              status: data ? data?.status : "active",
              link: data ? data?.link : "https://www.google.com/",
            }}
            validationSchema={sliderValidationSchema}
            onSubmit={data ? handleUpdate : handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              resetForm,
              handleBlur,
              handleChange,
              isSubmitting,
              setFieldValue,
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
                    {data ? "Update " : "Add "} Slider
                  </Typography>

                  <div style={{}}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleResetAndClose(resetForm)}
                    >
                      <AiOutlineCloseCircle
                        sx={{ color: "#ff4a68", height: "22px", width: "22px" }}
                        className="text-red-400 hover:text-600"
                      />
                    </IconButton>
                  </div>
                </Box>

                <Divider sx={{ mb: 2 }}>
                  <Chip label="Slider" />
                </Divider>

                <div className="space-y-6 mx-auto max-w-md">
                  <div className="my-4 rounded-md">
                    <label htmlFor="image">Image</label>

                    <div className="mt-1 flex border flex-col justify-center items-center space-x-2 p-10 bg-white rounded-md h-100vh">
                      {previewImage ? (
                        <div className="rounded-md bg-gray-100 p-3 mb-5 flex items-center justify-center">
                          <img
                            src={previewImage}
                            alt="Preview"
                            style={{ height: "100px", marginTop: "10px" }}
                            className="w-50 h-50 rounded-md"
                          />
                        </div>
                      ) : (
                        <div>
                          <AiOutlineCloudUpload className="w-16 h-16 text-blue-300 mb-5" />
                        </div>
                      )}

                      <input
                        id="image"
                        type="file"
                        name="image"
                        onBlur={handleBlur}
                        className={touched.image && errors.image ? "error" : ""}
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                          setPreviewImage(
                            URL.createObjectURL(event.currentTarget.files[0])
                          );
                        }}
                      />
                    </div>

                    <ErrorMessage
                      name="image"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>

                    <Field name="status">
                      {({ field, form }) => (
                        <Switch
                          id="status"
                          name="status"
                          color="primary"
                          checked={field.value === "active"}
                          onChange={(e) => {
                            const newStatus = e.target.checked
                              ? "active"
                              : "inactive";
                            form.setFieldValue("status", newStatus);
                          }}
                        />
                      )}
                    </Field>

                    <label
                      htmlFor="status"
                      className="text-sm font-medium text-gray-700"
                    >
                      {values.status === "active" ? "Active" : "Inactive"}
                    </label>
                  </div>

                  <div className="my-4 rounded-md">
                    <div className="mb-4   items-center justify-center">
                      <label
                        htmlFor="text"
                        className="block text-gray-800   mb-2"
                      >
                        Description Text
                      </label>

                      <Field
                        name="text"
                        component="textarea"
                        error={touched.text && errors.text}
                        className={`appearance-none block w-full px-3 py-3 border border-gray-300 
                                  rounded-md shadow-sm placeholder-gray-400 
                                  focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                    touched.text && errors.text
                                      ? "border-red-500"
                                      : ""
                                  }`}
                      />

                      {touched.text && errors.text && (
                        <p className="mt-2 text-sm text-red-600 ">
                          {errors.text}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="link" className="block text-gray-800  mb-2">
                      Link :
                    </label>

                    <Field
                      type="text"
                      name="link"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? <Progress /> : ""} {"  "}
                    {data ? "Update" : "Upload"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddSlider;
