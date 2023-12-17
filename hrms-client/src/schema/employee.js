import * as Yup from "yup";

const addressSchema = (addresstype) => {
  return Yup.string().required(`${addresstype} : Address is required`)
}

const phoneNumberSchema = () => {
  const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return Yup.string().required("Required").matches(phoneNumberRegex, "A valid phone number is required ");
}

const employee = Yup.object({
  employeeCode: Yup.string()
    .required("Employee Code is Mandatory")
    .max(7, "Maximum 7 characters are allowed"),
  employeeName: Yup.string()
    .max(35, "Maximum 35 characters are allowed")
    .required("Employee Name is mandatory"),
  guardian: Yup.string()
    .max(35, "Maximum 35 characters are allowed")
    .required("Required"),
  gender: Yup.string()
    .required("Specify Gender"),
  dateOfBirth: Yup.date()
    .required("Date of Birth(dd-MM-YYYY)"),
  designation: Yup.string()
    .oneOf(['Software Engineer', 'Tester'], "Invalid Job Type")
    .required("Designation is mandatory"),
  dateOfJoining: Yup.date()
    .required("Joining Date Required"),
  status: Yup.string()
    .oneOf(['Active', 'InActive'], 'Invalid Status')
    .required("Job Status is Required"),
  contactNumber: phoneNumberSchema(),
  address: addressSchema('Contact'),
  maritalStatus: Yup.string()
    .oneOf(['Married','Single'],'Invalid Marital Status')
    .required("MaritalStatus Required"),
  bankName: Yup.string()
    .required("Name of Bank Required"),
  ifscCode: Yup.string()
    .required("Bank IIFSC code Required"),
  accountNumber: Yup.number()
    .required("Account Number is Required"),
  pan: Yup.string()
    .required("Required"),
  aadhaar: Yup.string()
    .required("Required"),
  uan: Yup.string()
    .required("Required"),
  epfNumber: Yup.string()
    .required("Required"),
  esiNumber: Yup.string()
    .required("Required"),
  welfareFundNumber: Yup.string()
    .required("Required"),
  epfNominee: Yup.string()
    .required("Required"),
  epfNomineeRelation: Yup.string()
    .required("Required"),
  esiNominee: Yup.string()
    .required("Required"),
  esiNomineeRelation: Yup.string()
    .required("Required"),
  gpaIPNominee: Yup.string()
    .required("Required"),
  gpaIPNomineeRelation: Yup.string()
    .required("Required"),
  gratuityNominee: Yup.string()
    .required("Required"),
  gratuityNomineeRelation: Yup.string()
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
  addresspersonal: addressSchema("Personal"),
  phoneofficial: phoneNumberSchema(),
  phonePersonal: phoneNumberSchema()
});

export default employee;
