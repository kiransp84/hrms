import * as Yup from "yup";

const addressSchema = (addresstype)=>{
 return Yup.string().required(`${addresstype } : Address is required`)
}

const phoneNumberSchema = ()=>{
  const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
  return Yup.string().required("Required").matches(phoneNumberRegex,"A valid phone number is required ");
}

const employee = Yup.object({
  employeeCode: Yup.string()
    .required("Required")
    .max(7, "Must be 7 characters or less"),
  employeeName: Yup.string()
    .max(35, "Must be 35 characters or less")
    .required("Required"),
    guardian: Yup.string()
    .max(35, "Must be 15 characters or less")
    .required("Required")
});

const moved = Yup.object({
  offemail: Yup.string().email("Invalid email address").required("Required"),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  designation: Yup.string()
    .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
    .required("Required"),
  jobLocation: Yup.string().required(" A job location is required "),
  dob: Yup.date().required("Enter date of birth "),
  addressofficial: addressSchema("Official"),
  addresspersonal:addressSchema("Personal"),
  phoneofficial:phoneNumberSchema(),
  phonePersonal:phoneNumberSchema() 
});

export default employee;
