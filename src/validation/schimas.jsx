import * as Yup from "yup";

export const registerSchema = Yup.object({
    name: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password")], "Passwords must match")
})

export const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
})

export const forgotPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required")
})

export const resetPasswordSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password")], "Passwords must match")
})

export const changePasswordSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("newPassword")], "Passwords must match")
})

export const verifyEmailSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    otp: Yup.string().required("OTP is required")
})

export const addNoteSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    tag: Yup.string()
})

