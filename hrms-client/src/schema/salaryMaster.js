import * as Yup from "yup";

const payrollmaster = Yup.object({
    daysofattendance:Yup.number()
    .required("daysofattendance should be a number or 0 "),
    lossofpaydays:Yup.number()
    .required("lossofpaydays should be a number or 0 "),
    numberofweeklyoffgranted:Yup.number()
    .required("numberofweeklyoffgranted should be a number or 0 "),
    overtimewages:Yup.number()
    .required("overtimewages should be a number or 0"),
    leavewages:Yup.number()
    .required("leavewages should be a number or 0 "),
    nationalFestivalHolidayswages:Yup.number()
    .required("nationalFestivalHolidayswages should be a number or 0"),
    maternityBenefit:Yup.number()
    .required("maternityBenefit should be a number or 0 "),
    advances:Yup.number()
    .required("advances should be a number or 0"),
    welfareFund:Yup.number()
    .required("welfareFund should be a number or 0"),       
    professionalTax:Yup.number()
    .required("professionalTax should be a number or 0"),
    deductionofFine:Yup.number()
    .required("deductionofFine should be a number or 0"),  
    deductionforLossDamages:Yup.number()
    .required("deductionforLossDamages should be a number or 0"),
    otherDeduction:Yup.number()
    .required("otherDeduction should be a number or 0"),
    dateofPayment:Yup.date()
    .required("dateofPayment is should be a number or 0")               
});



export default payrollmaster;
