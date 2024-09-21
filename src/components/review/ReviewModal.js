import { useState } from "react";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { Rating } from "@smastrom/react-rating";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ReviewService from "../../service/ReviewService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    Box,
    Modal,
    Stack,
    Select,
    MenuItem,
    InputLabel,
    Typography,
    FormControl,
} from "@mui/material";

function ReviewModal({ 
    isOpen, 
    onClose, 
    fetchData, 
    selectedData, 
    setSelectedData 
}) {
    const [previewImage, setPreviewImage] = useState("");

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if(selectedData) {
                const response = await ReviewService.updateReview(selectedData?._id, values);
          
                if (response.status === 201) {
                  resetForm()
                  onClose();
                  fetchData();
                  setSelectedData(null);
                  toast.success("Review update successfully");
                } else if (response.status === 200) {
                  resetForm()
                  onClose();
                  fetchData();
                  setSelectedData(null);
                  toast.success("Review update successfully");
                } else {
                  toast.error("Something went wrong while sending the message");
                }
            } else {
                const response = await ReviewService.addReview(values);
          
                if (response.status === 201) {
                  resetForm()
                  onClose();
                  fetchData();
                  setSelectedData(null);
                  toast.success("Review add successfully");
                } else if (response.status === 200) {
                  resetForm()
                  onClose();
                  fetchData();
                  setSelectedData(null);
                  toast.success("Review add successfully");
                } else {
                  toast.error("Something went wrong while sending the message");
                }
            }
        } catch (error) {
          console.log("Error while sending message: ", error);
          toast.error("Something went wrong while sending the message");
        } finally {
          setSubmitting(false);
        }
    };

    const modalStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const contentStyle = {
        width: 550,
        height: "500px",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
        overflowY: "auto"
    };

    const closeIconStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
        cursor: "pointer",
        color: "red",
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={modalStyle}
        >
            <Box sx={contentStyle}>
            <MdClose size={24} onClick={onClose} style={closeIconStyle} />

            <h3 className="mb-4 mt-2 w-full text-2xl font-semibold">
                Update your review
            </h3>  

            <Formik
                initialValues={{
                    rating: selectedData ? selectedData.rating : 0,
                    review: selectedData ? selectedData?.review : "",
                    user_name: selectedData ? selectedData.user_name : "",
                    status: selectedData ? selectedData.status : "hide"
                }}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    isSubmitting,
                    setFieldValue,
                }) => (
                    <Form className="w-full grid grid-cols-2 gap-5">
                        <div className="my-4 rounded-md w-full col-span-2">
                            <label htmlFor="image">User Image</label>
                            <div className="mt-1 flex border flex-col justify-center items-center space-x-2 p-10 bg-white rounded-md">
                                {previewImage ? (
                                <div className="rounded-md bg-gray-100 p-3 mb-5 flex items-center justify-center">
                                    <img
                                    src={previewImage}
                                    alt="Preview"
                                    style={{ height: "100px", marginTop: "10px" }}
                                    className="w-40 h-40 rounded-md"
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
                                    setPreviewImage(
                                    URL.createObjectURL(event.currentTarget.files[0]),
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

                        <Stack direction={"column"} spacing={1.5} sx={{ pt: 2 }} className="col-span-2">
                            <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                                Review Status Type (Paid or Unpaid)
                            </Typography>
                            <FormControl>
                            <InputLabel id="select-label">Type</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select-label"
                                placeholder="Review Status Type"
                                value={values?.status}
                                label="Type"
                                onChange={(e) => setFieldValue("status", e.target.value)}
                                name="status"
                            >
                                <MenuItem value="hide">Hide</MenuItem>
                                <MenuItem value="show">Show</MenuItem>
                                
                            </Select>
                            </FormControl>
                        </Stack>

                        <div className="w-full col-span-2">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                                Rating:
                            </label>

                            <Rating
                                value={values.rating}
                                style={{ maxWidth: 120 }}
                                onChange={(value) => setFieldValue("rating", value)}
                            />
                        </div> 

                        <div className="mb-4 pt-2 w-full col-span-2">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                            User Name:
                            </label>

                            <Field
                            type="text"
                            name="user_name"
                            placeholder="Enter full name"
                            error={touched.user_name && errors.user_name}
                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                      rounded-md shadow-sm placeholder-gray-400 
                                      focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                        touched.user_name && errors.user_name
                                          ? "border-red-500"
                                          : ""
                                      }`}
                            />

                          {touched.user_name && errors.user_name && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.user_name}
                            </p>
                          )}
                        </div>  

                        <div className="mb-4 pt-2 w-full col-span-2">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                                Review Message:
                            </label>

                            <textarea 
                                value={values.review}
                                name="review" rows="4" cols="50"
                                placeholder="Enter your contact subject"
                                onChange={(e) => setFieldValue("review", e.target.value)}
                                className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.review && errors.review
                                        ? "border-red-500"
                                        : ""
                                    }`}
                            />

                            {touched.user_name && errors.user_name && (
                                <p className="mt-2 text-sm text-red-600 ">
                                    {errors.user_name}
                                </p>
                            )}
                        </div> 

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 col-span-2"
                        >
                            Send
                        </button>
                    </Form>
                )}
            </Formik>
            </Box>
        </Modal>
    );
}

export default ReviewModal;
