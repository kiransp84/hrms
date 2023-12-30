import * as Yup from "yup";

const payrollmaster = Yup.object({
  employeeCode: Yup.string()
    .required("Employee Code is Mandatory")
    .max(7, "Maximum 7 characters are allowed"),
    basicPay:Yup.number()
    .required("basicPay is mandatory"),
    dearnessAllowance:Yup.number()
    .required("dearnessAllowance is mandatory"),
    houseRentAllowance:Yup.number()
    .required("houseRentAllowance is mandatory"),
    cityCompensationAllowance:Yup.number()
    .required("cityCompensationAllowance is mandatory"),
    otherAllowances:Yup.number()
    .required("otherAllowances is mandatory"),
    riskAllowances:Yup.number()
    .required("riskAllowances is mandatory")
});



export default payrollmaster;
