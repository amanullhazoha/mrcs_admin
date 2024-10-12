import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdSubscriptions } from "react-icons/md";
import { Box, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import CommonEditor from "../components/common/CommonEditor";
import SubscriptionService from "../service/SubscriptionService";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const Subscription = () => {
  const [id, setId] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const access_token = Cookie.get("mrcs_cookie");

  const fetchData = async () => {
    setIsLoading(true);

    const res = await SubscriptionService.getSubscription();

    setEditorContent(res ? res?.data?.subscription.toString() : "");

    setId(res?.data?._id);
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);

      if (editorContent !== null) {
        const response = await SubscriptionService.updateSubscription(
          id,
          {
            subscription: editorContent,
          },
          access_token
        );

        if (response.status === 200) {
          toast.success("Subscription Saved successfully");

          fetchData();
        } else {
          toast.error("Something went wrong while Saving the Subscription");
        }
      } else {
        toast.error("Editor content is null. Cannot save subscription.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the question");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isloading === true) {
    return (
      <div>
        <CommonProgress />
      </div>
    );
  }
  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <MdSubscriptions size={23} className="min-w-max text-gray-500" />
              &nbsp; Subscription
            </Box>
          </Link>
        </Breadcrumbs>
      </PackageBreadcrumb>

      <div className="my-4 rounded-md">
        <div className="mb-4 items-center justify-center  px-4 py-2">
          <form onSubmit={handleUpdate}>
            <CommonEditor
              editorData={editorContent}
              setEditorData={setEditorContent}
            />

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="mt-3 md:mt-4 inline-flex items-center justify-center w-80 px-4 py-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
