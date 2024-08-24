import * as Yup from "yup";

const recallValidationSchema = Yup.object().shape({
  recall_name: Yup.string().required("Recall Name is required"),
  recall_title: Yup.string().required("Recall Title is required"),
});

export default recallValidationSchema;
