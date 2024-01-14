const mongoose = require('mongoose');
require('../../environment')();

const  {Schema} = mongoose ;

const companies = process.env.COMPANIES;

const salaryStatusSchema = new Schema({
    companyCode:{
        type: String,
        required: true,
        enum:companies.split(","),
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
    status:{
        type: String,
        default:'FINAL',
        enum:['FINAL'],
        immutable: true 
    }
});

const SalaryStatusModel = mongoose.model('salaryStatus', salaryStatusSchema );
module.exports = SalaryStatusModel;



