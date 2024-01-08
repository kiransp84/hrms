const express = require('express')
const router = express.Router()

const EmployeesModel = require('../schema/employee/EmployeeSchema');
const EmployeePayrollModel = require('../schema/payroll/EmployeePayrollSchema');
const SalaryModel = require("../schema/salary/SalarySchema");

router.post('/fetchSalaryForMonth', async (req, res) => { 
    const {employeeCode, salaryMonth, salaryYear} = req.body;
    if( !employeeCode || !salaryMonth || !salaryYear ) {
        res.send(null);
    }

    const employeeExists = await EmployeesModel.findOne({ employeeCode }).lean();
    if (!employeeExists) {
        res.send({
            statusCode: 'NOK',
            results: null,
            message: "Invalid Employee Code"
        });
        return ;
    }

    if( employeeExists.dateOfJoining ) {    
        const formattedDate = employeeExists.dateOfJoining.toISOString().split('T')[0];
        Object.assign(employeeExists , { dateOfJoining : formattedDate } );    
      }

    let activepayroll = await EmployeePayrollModel.findOne({ employeeCode }).lean();
    if (!activepayroll) {
        res.send({
            statusCode: 'NOK',
            results: null,
            message: "Payroll doesnt Exist"
        });
        return ;
    }

    let salaryDetails = await SalaryModel.findOne( {employeeCode, salaryMonth, salaryYear} ).lean();
    let showCreationMessage = false;
    if (!salaryDetails) {
        console.log(' Salary Not Saved ...Creation Mode Assumed ');
        showCreationMessage = true;
    }

    const salaryData = {
        employeeDetails : {
            employeeCode : employeeExists.employeeCode,
            companyCode : employeeExists.companyCode,
            employeeName : employeeExists.employeeName,
            designation : employeeExists.designation,
            dateOfJoining : employeeExists.dateOfJoining,
            bankName : employeeExists.bankName,
            ifscCode : employeeExists.ifscCode,
            accountNumber : employeeExists.accountNumber
        },
        payrollDetails:{
            basicPay: activepayroll.basicPay,
            dearnessAllowance: activepayroll.dearnessAllowance,
            houseRentAllowance:activepayroll.houseRentAllowance,
            cityCompensationAllowance:activepayroll.cityCompensationAllowance,
            otherAllowances:activepayroll.otherAllowances,
            riskAllowances:activepayroll.riskAllowances
        },
        salaryDetails
    };

    res.send({
        statusCode: 'OK',
        results: salaryData,
        message: showCreationMessage ? "Generate the salary and click to save": null 
    });

});



module.exports = router;
