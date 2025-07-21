import * as Yup from "yup";

const quizValidationSchema = Yup.object({
  // category: Yup.string().min(2).required("Category Name is required"),
  category: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one category")
    .required("Category is required"),
  quiz_name: Yup.string().min(3).required("Quiz Name is required"),
});

export default quizValidationSchema;
