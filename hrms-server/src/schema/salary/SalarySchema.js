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
    month:{
        type: String,
        required: true,
        enum:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
    },
    year:{
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
    modeofPayment:{
        type: String,
        required: true,
        enum:['Bank','Cash']
    },
    dateofPayment:{
        type: Date,
        required: true  
    }
});

const SalaryModel = mongoose.model('salary', salarySchema );
module.exports = SalaryModel;