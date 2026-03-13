import * as yup from "yup";

const EmployeeFormValidation = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required"),

  gender: yup
    .string()
    .oneOf(
      ["Male", "Female", "Non-binary", "Prefer not to say"],
      "Please select a valid gender"
    )
    .required("Gender is required"),

  dateOfBirth: yup
    .date()
    .nullable()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),

  jobTitle: yup
    .string()
    .oneOf(
      ["CEO", "CFO", "Human Resources", "Janitor"],
      "Please select a valid job title"
    )
    .required("Job title is required"),

  salary: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be a positive number")
    .lessThan(1000001, "Cannot earn more than a million dollars")
    .required("Salary is required"),
});

export default EmployeeFormValidation;