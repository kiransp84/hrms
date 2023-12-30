const mongoose = require('mongoose');

const { Schema } = mongoose;

//By default, Mongoose adds an _id property to your schemas.
//instanceof mongoose.Types.ObjectId; 
const employeeSchema = new Schema({
    employeeCode:{
        type: String,
        required: true,
        unique:true,
        immutable:true 
    },
    employeeName:{
        type: String,
        required: true  
    }, 
    guardian:{
        type: String,
        required: true  
    },
    gender:{
       type: String,
       required: true,
       enum:['Male','Female']
    },
    dateOfBirth:{
        type: Date,
        required: true  
    },
    designation:{
        type: String,
        required: true,
        enum:['Software Engineer','Tester']
    },
    dateOfJoining:{
        type: Date,
        required: true  
    },
    status:{
        type: String,
        required: true,
        enum: ['Active','InActive']  
    },
    contactNumber:{
        type: String,
        required: true  
    },
    address:{
        type: String,
        required: true  
    },
    maritalStatus:{
        type: String,
        required: true,
        enum: ['Married','Single']   
    },
    bankName:{
        type: String,
        required: true  
    },
    ifscCode:{
        type: String,
        required: true  
    },
    accountNumber:{
        type: String,
        required: true  
    },
    pan:{
        type: String,
        required: true  
    },
    aadhaar:{
        type: String,
        required: true  
    },
    uan:{
        type: String,
        required: true  
    },
    epfNumber:{
        type: String,
        required: true  
    },
    esiNumber:{
        type: String,
        required: true  
    },
    welfareFundNumber:{
        type: String,
        required: true  
    },
    epfNominee:{
        type: String,
        required: true  
    },
    epfNomineeRelation:{
        type: String,
        required: true  
    },
    esiNominee:{
        type: String,
        required: true  
    },
    esiNomineeRelation:{
        type: String,
        required: true  
    },
    gpaIPNominee:{
        type: String,
        required: true  
    },
    gpaIPNomineeRelation:{
        type: String,
        required: true  
    },
    gratuityNominee:{
        type: String,
        required: true  
    },
    gratuityNomineeRelation:{
        type: String,
        required: true  
    },
    lastWorkingDate:Date,
    dateOfReleaving:Date,
    remarks:String 
});

//module.exports = employeeSchema;
const EmployeesModel = mongoose.model('employees',employeeSchema);
module.exports = EmployeesModel;