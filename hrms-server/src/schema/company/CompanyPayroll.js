const mongoose = require('mongoose');
require('../../environment')();

const  {Schema} = mongoose ;

const companies = process.env.COMPANIES;

const companyPayrollSchema = new Schema({
    employeeCode:{
        type: String,
        required: true,
        immutable: true 
    },
    salaryMonth:{
        type: String,
        required: true,
        enum:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
        immutable: true 
    },
    salaryYear:{
        type: Number,
        required: true,
        immutable: true 
    },
    companyCode:{
        type: String,
        required: true,
        enum:companies.split(","),
        immutable: true 
    },        
    daysofattendance:{
        type: Number,
        required: true,
        immutable: true 
    },
    lossofpaydays:{
        type: Number,
        required: true,
        immutable: true 
    },
    numberofweeklyoffgranted:{
        type: Number,
        required: true,
        immutable: true 
    },
    numberofLeavegranted:{
        type: Number,
        required: true,
        immutable: true 
    },
    actualBasic:{
        type: Number,
        required: true,
        immutable: true 
    },
    actualDA:{
        type: Number,
        required: true,
        immutable: true 
    },
    grossMonthlyWages:{
        type: Number,
        required: true,
        immutable: true 
    },
    actualHRA:{
        type: Number,
        required: true,
        immutable: true 
    },
    actualCityCompensationallowances:{
        type: Number,
        required: true,
        immutable: true 
    },
    overtimewages:{
        type: Number,
        required: true,
        immutable: true 
    },
    leavewages:{
        type: Number,
        required: true,
        immutable: true 
    },
    nationalFestivalHolidayswages:{
        type: Number,
        required: true,
        immutable: true 
    },
    maternityBenefit:{
        type: Number,
        required: true,
        immutable: true 
    },
    actualOtherAllowances:{
        type: Number,
        required: true,
        immutable: true 
    },
    riskAllowances:{
        type: Number,
        required: true,
        immutable: true 
    },    
    totalAmount:{
        type: Number,
        required: true,
        immutable: true 
    },
    employeesProvidentFund:{
        type: Number,
        required: true,
        immutable: true 
    },
    employeesStateInsurance:{
        type: Number,
        required: true,
        immutable: true 
    },
    advances:{
        type: Number,
        required: true,
        immutable: true 
    },
    welfareFund:{
        type: Number,
        required: true,
        immutable: true 
    },
    professionalTax:{
        type: Number,
        required: true,
        immutable: true 
    },
    deductionofFine:{
        type: Number,
        required: true,
        immutable: true 
    },
    deductionforLossDamages:{
        type: Number,
        required: true,
        immutable: true 
        
    },
    otherDeduction:{
        type: Number,
        required: true,
        immutable: true 
    },
    totalDeduction:{
        type: Number,
        required: true,
        immutable: true 
    },
    netwagespaid:{
        type: Number,
        required: true,
        immutable: true 
    },
    modeOfPayment:{
        type: String,
        required: true,
        enum:['Bank','Cash']
    },
    dateofPayment:{
        type: Date,
        required: true  ,
        immutable: true 
    },
    status:{
        type: String,
        default:'DRAFT',
        enum:['FINAL'],
        immutable: true 
    },
    employeeName:{
        type: String,
        required: true 
        ,immutable: true 
    }, 
    designation:{
        type: String,
        required: true,
        enum:['Software Engineer','Tester'],
        immutable: true
    },
    dateOfJoining:{
        type: Date,
        required: true  
        ,immutable: true
    },
    bankName:{
        type: String,
        required: true  
        ,immutable: true
    },
    ifscCode:{
        type: String,
        required: true  
        ,immutable: true
    },
    accountNumber:{
        type: String,
        required: true  
        ,immutable: true
    },
    basicPay:{
        type: Number,
        required: true,
        immutable: true
    },
    dearnessAllowance:{
        type: Number,
        required: true,
        immutable: true
    },
    houseRentAllowance:{
        type: Number,
        required: true,
        immutable: true
    },
    cityCompensationAllowance:{
        type: Number,
        required: true,
        immutable: true
    },
    otherAllowances:{
        type: Number,
        required: true,
        immutable: true
    },
    riskAllowances:{
        type: Number,
        required: true,
        immutable: true
    },
});

const CompanyPayrollModel = mongoose.model('companyPayroll', companyPayrollSchema );
module.exports = CompanyPayrollModel;



