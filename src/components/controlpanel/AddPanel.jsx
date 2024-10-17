import Cookie from "js-cookie";
import Fade from "@mui/material/Fade";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import { Progress } from "../common/Progress";
import Backdrop from "@mui/material/Backdrop";
import CommonEditor from "../common/CommonEditor";
import Typography from "@mui/material/Typography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ControlPanelService from "../../service/ControlPanelService";
import { Box, Chip, Divider, IconButton, Switch } from "@mui/material";
import panelValidationSchema from "../../utils/validation/panelValidation";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";

const style = {
  p: 4,
  left: "50%",
  top: "50%",
  width: ["70%"],
  overflow: "auto",
  overflowY: "auto",
  maxHeight: "90vh",
  position: "absolute",
  borderRadius: "10px",
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  transform: "translate(-50%,-50%)",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
};

const AddPanelModal = ({ open, onClose, data, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewBanner, setPreviewBanner] = useState(data ? data.image : "");
  const [editorContent, setEditorContent] = useState(
    data ? data?.text?.toString() : ""
  );

  const access_token = Cookie.get("mrcs_cookie");

  const handleResetAndClose = (resetForm) => {
    fetchData();

    onClose();

    resetForm();

    setPreviewBanner("");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("image", values.image);
      formData.append("status", values.status);
      formData.append("link", values.link);
      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle);
      formData.append("text", editorContent);
      formData.append("buttonName", values.buttonName);

      await ControlPanelService.addControl(formData, access_token);

      toast.success("Add Successfully");

      fetchData();

      setPreviewBanner(null);

      onClose();
    } catch (error) {
      toast.error("Something went wrong uploading");
    }

    setIsLoading(false);
    setSubmitting(false);
  };

  const handleUpdate = async (values, { setSubmitting, setErrors }) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("link", values.link);
      formData.append("image", values.image);
      formData.append("title", values.title);
      formData.append("text", editorContent);
      formData.append("status", values.status);
      formData.append("subtitle", values.subtitle);
      formData.append("buttonName", values.buttonName);

      await ControlPanelService.updateControl(
        data?._id,
        formData,
        access_token
      );

      toast.success("Update Successfully");

      fetchData();

      setPreviewBanner(null);

      onClose();
    } catch (error) {
      toast.error("Something went wrong uploading");
    }

    setIsLoading(false);
    setSubmitting(false);
  };

  const inputClass = `mt-1 block w-full border rounded-md py-2 px-3 text-sm leading-5
        bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500
        focus:border-blue-500 sm:text-sm sm:leading-5`;

  return (
    <Modal
      open={open}
      onClose={false}
      disableEnforceFocus
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
              link: data ? data.link : "",
              title: data ? data.title : "",
              image: data ? data?.image : "",
              subtitle: data ? data.subtitle : "",
              status: data ? data.status : "inactive",
              text: data ? data?.text : editorContent,
              buttonName: data ? data?.buttonName : "",
            }}
            validationSchema={panelValidationSchema}
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
                    pb: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="h5">
                    {data ? "Update " : "Add "} Panel
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
                  <Chip label="Control Panel" />
                </Divider>

                <div className="space-y-6 mx-auto ">
                  <div className="my-4 rounded-md">
                    <label htmlFor="Banner">Banner</label>
                    <div className="mt-1 flex border flex-col justify-center items-center space-x-2 p-10 bg-white rounded-md h-100vh">
                      {previewBanner ? (
                        <div className="rounded-md bg-gray-100 p-3 mb-5 flex items-center justify-center">
                          <img
                            src={previewBanner}
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
                        name="image"
                        type="file"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                          setPreviewBanner(
                            URL.createObjectURL(event.currentTarget.files[0])
                          );
                        }}
                        onBlur={handleBlur}
                        className={touched.image && errors.image ? "error" : ""}
                      />
                    </div>

                    <ErrorMessage
                      name="image"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="Panel"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ControlPanel
                    </label>
                    <Field
                      id="title"
                      type="text"
                      name="title"
                      autoComplete="off"
                      placeholder="Title"
                      inputValue={values.title}
                      handleChange={handleChange}
                      className={`${inputClass} ${
                        errors.cat_name && touched.cat_name
                          ? "border-red-500"
                          : ""
                      }`}
                    />

                    <ErrorMessage
                      name="title"
                      component="div"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="Panel"
                      className="block text-sm font-medium text-gray-700"
                    >
                      SubTitle
                    </label>

                    <Field
                      type="text"
                      id="subtitle"
                      name="subtitle"
                      autoComplete="off"
                      placeholder="Sub Title"
                      handleChange={handleChange}
                      inputValue={values.subtitle}
                      className={`${inputClass} ${
                        errors.cat_name && touched.cat_name
                          ? "border-red-500"
                          : ""
                      }`}
                    />

                    <ErrorMessage
                      name="subtitle"
                      component="div"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="Panel"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Button Text
                    </label>

                    <Field
                      type="text"
                      id="buttonName"
                      name="buttonName"
                      autoComplete="off"
                      placeholder="Button Text"
                      handleChange={handleChange}
                      inputValue={values.buttonName}
                      className={`${inputClass} ${
                        errors.link && touched.link ? "border-red-500" : ""
                      }`}
                    />

                    <ErrorMessage
                      component="div"
                      name="buttonName"
                      className="mt-2 text-sm text-red-600"
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

                  <CommonEditor
                    editorData={editorContent}
                    setEditorData={setEditorContent}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? <Progress className="mr-2" /> : ""}
                    {data ? "Update" : "Submit"}
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

export default AddPanelModal;
