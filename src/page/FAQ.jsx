import "jspdf-autotable";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { GiBlackBook } from "react-icons/gi";
import FaqService from "../service/FAQService";
import { Box, Breadcrumbs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Progress } from "../components/common/Progress";
import CommonEditor from "../components/common/CommonEditor";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const FAQ = () => {
  const access_token = Cookie.get("mrcs_cookie");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editorContent, setEditorContent] = useState(data ? data?.text1 : "");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      let datas = {
        ...values,
        faq_description: editorContent,
      };

      const response = await FaqService.addFaq(datas, access_token);

      if (response.status === 201) {
        toast.success("FAQ created successfully");
        await fetchData();
      } else if (response.status === 200) {
        toast.success("FAQ created successfully");
        await fetchData();
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
      const response = await FaqService.updateFaq(
        data?._id,
        {
          ...values,
          faq_description: editorContent,
        },
        access_token
      );

      if (response.status === 200) {
        toast.success("FAQ updated successfully !");
        await fetchData();
      } else {
        toast.error("Something went wrong while updating the Study");
      }
    } catch (error) {
      console.log("Error while updating Study: ", error);
      toast.error("Something went wrong while updating the Study !");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    const res = await FaqService.getFaq();

    setData(res.data);
    setEditorContent(res.data?.faq_description);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <GiBlackBook size={23} className="min-w-max text-gray-500" />
                &nbsp; Manage FAQ
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>

        {isLoading ? (
          <CommonProgress />
        ) : (
          <div className="pt-5">
            <Formik
              initialValues={{
                faq_title: data ? data?.faq_title : "",
              }}
              onSubmit={data ? handleUpdate : handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="space-y-6 ">
                    <div>
                      <div className="my-2 rounded-md">
                        <div className="mb-4  pt-2 items-center justify-center">
                          <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                          >
                            FAQ Title :
                          </label>
                          <Field
                            type="text"
                            name="faq_title"
                            placeholder="Enter FAQ Title"
                            className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                            rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500
                          focus:border-green-500 focus:ring-1 sm:text-sm`}
                          />
                        </div>
                      </div>

                      <div className="my-4 ">
                        <div className="mb-4 items-center justify-center py-2">
                          <CommonEditor
                            minHeight={500}
                            editorData={editorContent}
                            setEditorData={setEditorContent}
                          />
                        </div>
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
          </div>
        )}
      </div>
    </>
  );
};

export default FAQ;
