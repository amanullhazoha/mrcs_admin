import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  Backdrop,
  Box,
  Chip,
  Divider,
  Fade,
  IconButton,
  Modal,
  Switch,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";

import { toast } from "react-toastify";
import { Progress } from "../common/Progress";

import recallValidationSchema from "../../utils/validation/recallValidation";
import RecallService from "../../service/RecallService";
import CommonEditor from "../common/CommonEditor";
import RecallCategoryService from "../../service/RecallCategoryService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: ["90%", "90%", "60%"],
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
  maxHeight: "90vh",
  overflow: "auto",
};

const AddRecall = ({ open, onClose, data, fetchData }) => {
  const [previewImage, setPreviewImage] = useState(data ? data?.image : "");
  const [editorContent, setEditorContent] = useState(data ? data?.text1 : "");
  const handleResetAndClose = (resetForm) => {
    fetchData();
    onClose();
    resetForm();
    setPreviewImage("");
  };

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const res = await RecallCategoryService.getRecallCategory();
    const activeCategories = res.data.filter(
      (category) => category.cat_status === "active",
    );
    setCategory(
      activeCategories.map((category) => ({
        value: category.cat_name,
        label: category.cat_name,
      })),
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      let datas = {
        ...values,
        text1: editorContent,
      };

      const response = await RecallService.addRecall(datas);

      if (response.status === 201) {
        toast.success("Recall created successfully");
        fetchData();
        onClose();
      } else if (response.status === 200) {
        toast.success("Recall created successfully");
        fetchData();
        onClose();
      } else {
        toast.error("Something went wrong while creating the question");
      }
    } catch (error) {
      console.log("Error while creating question: ", error);
      toast.error("Something went wrong while creating the question");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    console.log("Click HandleUpdate");
    try {
      setIsLoading(true);
      const response = await RecallService.updateRecall(data?._id, {
        ...values,
        text1: editorContent,
      });

      if (response.status === 200) {
        toast.success("Recall updated successfully !");
        fetchData();
        onClose();
      } else {
        toast.error("Something went wrong while updating the Recall");
      }
    } catch (error) {
      console.log("Error while updating Recall: ", error);
      toast.error("Something went wrong while updating the Recall !");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Modal
      disableEnforceFocus
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={false}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
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
              image: data ? data?.image : "",
              category: data ? data?.category : "",
              recall_name: data ? data?.recall_name : "",
              recall_title: data ? data?.recall_title : "",
              recall_description: data ? data?.recall_description : "",
              status: data ? data?.status : "active",
              link: data ? data?.link : "",
              accessibility: data ? data?.accessibility : "unpaid",
            }}
            validationSchema={recallValidationSchema}
            onSubmit={data ? handleUpdate : handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
              resetForm,
            }) => (
              <Form>
                {/* <>{JSON.stringify(values)}</> */}
                <Box
                  sx={{
                    pb: 0,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="h5">
                    {data && data?.length > 0 ? "Update " : "Add "} Recall
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
                  <Chip label="Recall" />
                </Divider>

                <div className="space-y-6 ">
                  <div>
                    {/* Study Name  */}
                    <div>
                      <div
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 "
                      >
                        Category
                      </div>

                      <div className="mt-5">
                        <FormControl fullWidth>
                          <InputLabel id="category-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={values?.category}
                            onChange={handleChange}
                            label="Category"
                            onBlur={handleBlur}
                            error={
                              touched.category && Boolean(errors.category)
                            }
                          >
                            {category?.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                              >
                                {option?.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.category && Boolean(errors.category) && (
                            <FormHelperText error>
                              {errors.category}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </div>
                    </div>

                    <div className="my-2 rounded-md">
                      <div className="mb-4  pt-2 items-center justify-center">
                        <label
                          htmlFor="question_name"
                          className="block text-gray-800  font-md mb-2"
                        >
                          Recall Name :
                        </label>
                        <Field
                          type="text"
                          name="recall_name"
                          placeholder="Enter Recall Name"
                          error={touched.recall_name && errors.recall_name}
                          className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.recall_name && errors.recall_name
                                        ? "border-red-500"
                                        : ""
                                    }`}
                        />
                        {touched.recall_name && errors.recall_name && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.recall_name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Image Section  */}
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
                          name="image"
                          type="file"
                          onChange={(event) => {
                            setFieldValue(
                              "image",
                              event.currentTarget.files[0],
                            );
                            setPreviewImage(
                              URL.createObjectURL(event.currentTarget.files[0]),
                            );
                          }}
                          onBlur={handleBlur}
                          className={
                            touched.image && errors.image ? "error" : ""
                          }
                          style={{ color: "blue" }}
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

                    {/* Study Title  */}
                    <div className="my-2 rounded-md">
                      <div className="mb-4  pt-2 items-center justify-center">
                        <label
                          htmlFor="recall_title"
                          className="block text-gray-800  font-md mb-2"
                        >
                          Recall Title :
                        </label>
                        <Field
                          type="text"
                          name="recall_title"
                          placeholder="Enter Recall Title"
                          error={touched.recall_title && errors.recall_title}
                          className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.recall_title &&
                                      errors.recall_title
                                        ? "border-red-500"
                                        : ""
                                    }`}
                          //   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {touched.recall_title && errors.recall_title && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.recall_title}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Text 1  */}
                    <div className="my-4 ">
                      <div className="mb-4 items-center justify-center   py-2">
                        <CommonEditor
                          editorData={editorContent}
                          setEditorData={setEditorContent}
                        />
                      </div>
                    </div>

                    {/* Description ...... */}
                    <div className="my-4 rounded-md">
                      <div className="mb-4 items-center justify-center">
                        <label
                          htmlFor="recall_description"
                          className="block text-gray-800   mb-2"
                        >
                          Recall Description (optional)
                        </label>

                        <Field
                          component="textarea"
                          name="recall_description"
                          error={
                            touched.recall_description &&
                            errors.recall_description
                          }
                          className={`appearance-none block w-full px-3 py-3 border border-gray-300 
                                  rounded-md shadow-sm placeholder-gray-400 
                                  focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                    touched.recall_description &&
                                    errors.recall_description
                                      ? "border-red-500"
                                      : ""
                                  }`}
                          //   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {touched.recall_description &&
                          errors.recall_description && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.recall_description}
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Link  */}
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
                        //   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default AddRecall;
