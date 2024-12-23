import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { Progress } from "../common/Progress";
import CommonEditor from "../common/CommonEditor";
import React, { useState, useEffect } from "react";
import RecallService from "../../service/RecallService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RecallCategoryService from "../../service/RecallCategoryService";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import recallValidationSchema from "../../utils/validation/recallValidation";
import {
  Box,
  Chip,
  Fade,
  Modal,
  Switch,
  Select,
  Divider,
  MenuItem,
  Backdrop,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

const style = {
  p: 4,
  top: "50%",
  left: "50%",
  overflow: "auto",
  maxHeight: "90vh",
  position: "absolute",
  borderRadius: "10px",
  bgcolor: "background.paper",
  width: ["90%", "90%", "60%"],
  border: "2px solid #F7FDFF",
  transform: "translate(-50%,-50%)",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
};

const AddRecall = ({ open, onClose, data, fetchData }) => {
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(data ? data?.image : "");
  const [editorContent, setEditorContent] = useState(data ? data?.text1 : "");

  const access_token = Cookie.get("mrcs_cookie");

  const handleResetAndClose = (resetForm) => {
    fetchData();

    onClose();

    resetForm();

    setPreviewImage("");
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const res = await RecallCategoryService.getRecallCategory();

    const activeCategories = res.data.filter(
      (category) => category.cat_status === "active"
    );

    setCategory(
      activeCategories.map((category) => ({
        value: category.cat_name,
        label: category.cat_name,
      }))
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);

      let datas = {
        ...values,
        text1: editorContent,
      };

      const response = await RecallService.addRecall(datas, access_token);

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
      const response = await RecallService.updateRecall(
        data?._id,
        {
          ...values,
          text1: editorContent,
        },
        access_token
      );

      if (response.status === 200) {
        toast.success("Recall updated successfully !");

        fetchData();
        onClose();
      } else {
        toast.error("Something went wrong while updating the Recall");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the Recall !");
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
              category: data ? data?.category : "",
              status: data ? data?.status : "active",
              recall_name: data ? data?.recall_name : "",
              recall_title: data ? data?.recall_title : "",
              accessibility: data ? data?.accessibility : "unpaid",
              recall_description: data ? data?.recall_description : "",
            }}
            validationSchema={recallValidationSchema}
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
                    <div>
                      <div
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 "
                      >
                        Category
                      </div>

                      <div className="mt-5">
                        <FormControl fullWidth>
                          <InputLabel id="category-label">Category</InputLabel>

                          <Select
                            id="category"
                            name="category"
                            label="Category"
                            onBlur={handleBlur}
                            labelId="category-label"
                            onChange={handleChange}
                            value={values?.category}
                            error={touched.category && Boolean(errors.category)}
                          >
                            {category?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
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
                              alt="Preview"
                              src={previewImage}
                              className="w-50 h-50 rounded-md"
                              style={{ height: "100px", marginTop: "10px" }}
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
                          className={
                            touched.image && errors.image ? "error" : ""
                          }
                          onChange={(event) => {
                            setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            );
                            setPreviewImage(
                              URL.createObjectURL(event.currentTarget.files[0])
                            );
                          }}
                        />
                      </div>

                      <ErrorMessage
                        name="image"
                        component="div"
                        style={{ color: "red" }}
                        className="error-message text-danger"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Accessibility
                      </label>

                      <Field name="accessibility">
                        {({ field, form }) => (
                          <Switch
                            color="primary"
                            id="accessibility"
                            name="accessibility"
                            checked={field.value === "paid"}
                            onChange={(e) => {
                              const newStatus = e.target.checked
                                ? "paid"
                                : "unpaid";
                              form.setFieldValue("accessibility", newStatus);
                            }}
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
                        />

                        {touched.recall_title && errors.recall_title && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.recall_title}
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
                        />

                        {touched.recall_description &&
                          errors.recall_description && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.recall_description}
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

export default AddRecall;
