import Cookie from "js-cookie";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Progress } from "../common/Progress";
import CommonEditor from "../common/CommonEditor";
import StudyService from "../../service/StudyService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import studyValidationSchema from "../../utils/validation/studyValidation";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import {
  Box,
  Chip,
  Fade,
  Modal,
  Switch,
  Divider,
  Backdrop,
  IconButton,
  Typography,
} from "@mui/material";

const style = {
  p: 4,
  top: "50%",
  left: "50%",
  width: ["80%"],
  overflow: "auto",
  maxHeight: "90vh",
  borderRadius: "10px",
  position: "absolute",
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  transform: "translate(-50%,-50%)",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
};

const AddStudy = ({ open, onClose, data, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(data ? data?.image : "");
  const [editorContent, setEditorContent] = useState(data ? data?.text1 : "");

  const access_token = Cookie.get("access_token");

  const handleResetAndClose = (resetForm) => {
    fetchData();

    onClose();

    resetForm();

    setPreviewImage("");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      let datas = {
        ...values,
        text1: editorContent,
      };

      const response = await StudyService.addStudy(datas, access_token);

      if (response.status === 201) {
        toast.success("Study created successfully");

        fetchData();

        onClose();
      } else if (response.status === 200) {
        toast.success("Study created successfully");

        fetchData();

        onClose();
      } else {
        toast.error("Something went wrong while creating the question");
      }
    } catch (error) {
      toast.error("Something went wrong while creating the question");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);

      const response = await StudyService.updateStudy(
        data?._id,
        {
          ...values,
          text1: editorContent,
        },
        access_token
      );

      if (response.status === 200) {
        toast.success("Study updated successfully!");

        fetchData();

        onClose();
      } else {
        toast.error("Something went wrong while updating the Study");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the Study !");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

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
              link: data ? data?.link : "",
              image: data ? data?.image : "",
              status: data ? data?.status : "active",
              study_name: data ? data?.study_name : "",
              study_title: data ? data?.study_title : "",
              accessibility: data ? data?.accessibility : "unpaid",
              study_description: data ? data?.study_description : "",
            }}
            validationSchema={studyValidationSchema}
            onSubmit={data ? handleUpdate : handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              resetForm,
              handleBlur,
              isSubmitting,
              handleChange,
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
                    {data && data?.length > 0 ? "Update " : "Add "} Study
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
                  <Chip label="Study" />
                </Divider>

                <div className="space-y-6 ">
                  <div>
                    {/* Study Name  */}
                    <div className="my-2 rounded-md">
                      <div className="mb-4  pt-2 items-center justify-center">
                        <label
                          htmlFor="question_name"
                          className="block text-gray-800  font-md mb-2"
                        >
                          Study Name :
                        </label>

                        <Field
                          type="text"
                          name="study_name"
                          placeholder="Enter Study Name"
                          error={touched.study_name && errors.study_name}
                          className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.study_name && errors.study_name
                                        ? "border-red-500"
                                        : ""
                                    }`}
                        />

                        {touched.study_name && errors.study_name && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.study_name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="my-4 rounded-md ">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700 "
                      >
                        Image
                      </label>

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
                          style={{ color: "blue" }}
                          onChange={(event) => {
                            setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            );
                            setPreviewImage(
                              URL.createObjectURL(event.currentTarget.files[0])
                            );
                          }}
                          className={
                            touched.image && errors.image ? "error" : ""
                          }
                        />
                      </div>

                      <ErrorMessage
                        name="image"
                        component="div"
                        className="error-message text-danger"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Accessibility
                      </label>

                      <Field name="accessibility">
                        {({ field, form }) => (
                          <Switch
                            id="accessibility"
                            name="accessibility"
                            checked={field.value === "paid"}
                            onChange={(e) => {
                              const newStatus = e.target.checked
                                ? "paid"
                                : "unpaid";
                              form.setFieldValue("accessibility", newStatus);
                            }}
                            color="primary"
                          />
                        )}
                      </Field>

                      <label
                        htmlFor="accessibility"
                        className="text-sm font-medium text-gray-700"
                      >
                        {values.accessibility === "paid" ? "paid" : "unpaid"}
                      </label>
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
                            checked={field.value === "active"}
                            onChange={(e) => {
                              const newStatus = e.target.checked
                                ? "active"
                                : "inactive";
                              form.setFieldValue("status", newStatus);
                            }}
                            color="primary"
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

                    <div className="my-2 rounded-md">
                      <div className="mb-4  pt-2 items-center justify-center">
                        <label
                          htmlFor="study_title"
                          className="block text-gray-800  font-md mb-2"
                        >
                          Study Title :
                        </label>

                        <Field
                          type="text"
                          name="study_title"
                          placeholder="Enter Study Title"
                          error={touched.study_title && errors.study_title}
                          className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.study_title && errors.study_title
                                        ? "border-red-500"
                                        : ""
                                    }`}
                        />

                        {touched.study_title && errors.study_title && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.study_title}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="my-4 ">
                      <div className="mb-4 items-center justify-center   py-2">
                        <CommonEditor
                          editorData={editorContent}
                          setEditorData={setEditorContent}
                        />
                      </div>
                    </div>

                    <div className="my-4 rounded-md">
                      <div className="mb-4   items-center justify-center">
                        <label
                          htmlFor="study_description"
                          className="block text-gray-800   mb-2"
                        >
                          Study Description (optional)
                        </label>

                        <Field
                          component="textarea"
                          name="study_description"
                          error={
                            touched.study_description &&
                            errors.study_description
                          }
                          className={`appearance-none block w-full px-3 py-3 border border-gray-300 
                                  rounded-md shadow-sm placeholder-gray-400 
                                  focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                    touched.study_description &&
                                    errors.study_description
                                      ? "border-red-500"
                                      : ""
                                  }`}
                        />

                        {touched.study_description &&
                          errors.study_description && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.study_description}
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="link"
                        className="block text-gray-800   mb-2"
                      >
                        Question Link (optional)
                      </label>

                      <Field
                        type="text"
                        name="link"
                        placeholder="Add Question Link"
                        error={touched.link && errors.link}
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.link && errors.link
                                        ? "border-red-500"
                                        : ""
                                    }`}
                      />

                      {touched.link && errors.link && (
                        <p className="mt-2 text-sm text-red-600 ">
                          {errors.link}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? <Progress className="mr-2 px-4" /> : ""}

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

export default AddStudy;
