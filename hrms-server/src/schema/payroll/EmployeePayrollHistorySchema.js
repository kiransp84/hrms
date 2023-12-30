const mongoose = require('mongoose');

const  {Schema} = mongoose ;

const employeePayrollHistorySchema = new Schema({
    employeeCode:{
        type: String,
        required: true,
        immutable: true 
    },
    version:{
        type: Number,
        required: true,
    },
    basicPay:{
        type: Number,
        required: true,
    },
    dearnessAllowance:{
        type: Number,
        required: true,
    },
    houseRentAllowance:{
        type: Number,
        required: true,
    },
    cityCompensationAllowance:{
        type: Number,
        required: true,
    },
    otherAllowances:{
        type: Number,
        required: true,
    },
    riskAllowances:{
        type: Number,
        required: true,
    }    
});


const EmployeePayrollHistoryModel = mongoose.model('employeepayrollhistory', employeePayrollHistorySchema );
module.exports = EmployeePayrollHistoryModel;



