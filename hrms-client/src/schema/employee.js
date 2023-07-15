import * as Yup from "yup";

const addressSchema = (addresstype)=>{
 return Yup.string().required(`${addresstype } : Address is required`)
}

const phoneNumberSchema = ()=>{
  const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
  return Yup.string().required("Required").matches(phoneNumberRegex,"A valid phone number is required ");
}

const employee = Yup.object({
  empId: Yup.number()
    .required("Required")
    .positive("Must be an integer ")
    .integer("Must be a positive integer "),
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
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
