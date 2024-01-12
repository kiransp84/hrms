require('../../environment')();
const mongoose = require('mongoose');
const  {Schema} = mongoose ;

const companies = process.env.COMPANIES;

const salarySchema = new Schema({
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
        enum:companies.split(",")
    },        
    daysofattendance:{
        type: Number,
        required: true
    },
    lossofpaydays:{
        type: Number,
        required: true
    },
    numberofweeklyoffgranted:{
        type: Number,
        required: true
    },
    numberofLeavegranted:{
        type: Number,
        required: true
    },
    actualBasic:{
        type: Number,
        required: true
    },
    actualDA:{
        type: Number,
        required: true
    },
    grossMonthlyWages:{
        type: Number,
        required: true
    },
    actualHRA:{
        type: Number,
        required: true
    },
    actualCityCompensationallowances:{
        type: Number,
        required: true
    },
    overtimewages:{
        type: Number,
        required: true
    },
    leavewages:{
        type: Number,
        required: true
    },
    nationalFestivalHolidayswages:{
        type: Number,
        required: true
    },
    maternityBenefit:{
        type: Number,
        required: true
    },
    actualOtherAllowances:{
        type: Number,
        required: true
    },
    riskAllowances:{
        type: Number,
        required: true
    },    
    totalAmount:{
        type: Number,
        required: true
    },
    employeesProvidentFund:{
        type: Number,
        required: true
    },
    employeesStateInsurance:{
        type: Number,
        required: true
    },
    advances:{
        type: Number,
        required: true
    },
    welfareFund:{
        type: Number,
        required: true
    },
    professionalTax:{
        type: Number,
        required: true
    },
    deductionofFine:{
        type: Number,
        required: true
    },
    deductionforLossDamages:{
        type: Number,
        required: true,
        
    },
    otherDeduction:{
        type: Number,
        required: true,
        
    },
    totalDeduction:{
        type: Number,
        required: true,
        
    },
    netwagespaid:{
        type: Number,
        required: true,
        
    },
    modeOfPayment:{
        type: String,
        required: true,
        enum:['Bank','Cash']
    },
    dateofPayment:{
        type: Date,
        required: true  
    },
    status:{
        type: String,
        default:'DRAFT',
        enum:['DRAFT','FINAL']
    }
});

const SalaryModel = mongoose.model('salary', salarySchema );
module.exports = SalaryModel;