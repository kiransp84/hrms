const mongoose = require('mongoose');

const  {Schema} = mongoose ;

const EmployeePayrollHistoryModel = require('./EmployeePayrollHistorySchema');

const employeePayrollSchema = new Schema({
    employeeCode:{
        type: String,
        required: true,
        immutable: true 
    },
    version:{
        type: Number,
        required: true,
        default: 1
        /* wrong approach set: (v) => v + 1*/
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
employeePayrollSchema.pre('findOneAndUpdate', async function(next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    if(!docToUpdate)
    next();

        //save history 
        let employeeModel = new EmployeePayrollHistoryModel();
        employeeModel.employeeCode=docToUpdate.employeeCode;
        employeeModel.basicPay=docToUpdate.basicPay;
        employeeModel.dearnessAllowance=docToUpdate.dearnessAllowance;
        employeeModel.houseRentAllowance=docToUpdate.houseRentAllowance;
        employeeModel.cityCompensationAllowance=docToUpdate.cityCompensationAllowance;
        employeeModel.otherAllowances=docToUpdate.otherAllowances;
        employeeModel.riskAllowances=docToUpdate.riskAllowances;
        employeeModel.version = docToUpdate.version;

    const newVersion = docToUpdate.version  + 1 ;
    console.log(' new version ', newVersion );
    docToUpdate.set('version',newVersion) ;
    docToUpdate.save();
    employeeModel.save(); 

    next();
});


const EmployeePayrollModel = mongoose.model('employeepayroll', employeePayrollSchema );
module.exports = EmployeePayrollModel;



