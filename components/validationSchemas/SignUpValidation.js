import * as yup from "yup";

const SignUpValidation = yup.object({
  name: yup
    .string()
    .trim()
    .required("Full name is required"),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Valid email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),

  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Password confirmation is required"),
});

export default SignUpValidation;