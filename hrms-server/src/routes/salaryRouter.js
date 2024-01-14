const express = require('express')
const router = express.Router()

const EmployeesModel = require('../schema/employee/EmployeeSchema');
const EmployeePayrollModel = require('../schema/payroll/EmployeePayrollSchema');
const SalaryModel = require("../schema/salary/SalarySchema");
const assign = require('lodash.assign');

const {fetchEmployeeCodes} = require('./employeeDao');
const {fetchAllSalary,finalize} = require('./salaryDao');

const {findMissingOnes} = require('./utils');


const copyPasteAttributes = (source={},destination) => {
    destination = assign(destination,source);  
}

router.post('/saveSalaryForMonth', async (req,res) => {
    const {employeeCode, salaryMonth, salaryYear} = req.body;
    if( !employeeCode || !salaryMonth || !salaryYear ) {
        res.send(null);
    }
    
    
    let salaryDetails = await SalaryModel.findOne( {employeeCode, salaryMonth, salaryYear} ).lean();
    if (salaryDetails) {
        if( "FINAL" === salaryDetails.status){
            res.send({
                statusCode: 'NOK',
                results: null,
                message: "Salary Already Finalized"
            });
            return ;
        }else {      
            console.log('    req.body' ,     req.body);
            const document = await SalaryModel.findOneAndUpdate({employeeCode, salaryMonth, salaryYear} ,
                req.body
            );
            console.log(document);
            
            res.send({
                statusCode: 'OK',
                results: null,
                message: `Employee Salary Updated For Employee ${document.employeeCode} For ${document.salaryMonth}-${document.salaryYear} With Status as ${document.status}`
            });

            return;
        }


    }

    console.log(' found new salary hence creating ');

    
    
    let salaryModel = new SalaryModel();
    copyPasteAttributes(req.body,salaryModel);
    console.log(' Model before saving ',JSON.stringify(salaryModel));

    try{
        await salaryModel.save(); 
    }catch(error ){
        console.error(error);
        const saveSalaryResponse = {
            statusCode:'NOK',
            message:"Salary Save Failed due to error"
        }
        res.send(saveSalaryResponse); 
        return;
    }
    
    const saveSalaryResponse = {
      statusCode:'OK',
      results:[salaryModel],
      message:`Employee Salary Saved For Employee ${salaryModel.employeeCode} For ${salaryModel.salaryMonth}-${salaryModel.salaryYear} With Status as ${salaryModel.status}`
    }
    res.send(saveSalaryResponse); 
    

});

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

    /*if( salaryDetails.dateofPayment ) {    
        const formattedDate = salaryDetails.dateofPayment.toISOString().split('T')[0];
        Object.assign(salaryDetails , { dateofPayment : formattedDate } );    
    }*/  

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
            riskAllowances:activepayroll.riskAllowances,
            modeOfPayment:activepayroll.modeOfPayment
        },
        salaryDetails
    };

    res.send({
        statusCode: 'OK',
        results: salaryData,
        message: showCreationMessage ? "Generate the salary and click to save": null 
    });

});

router.post('/fetchAllSalary' , async (req,res) => {

    const {companyCode, salaryMonth, salaryYear} = req.body;
    if( !companyCode || !salaryMonth || !salaryYear ) {
        res.send(null);
        return;
    }

    const employeesCodes = await fetchEmployeeCodes({companyCode,status:'Active'});
    if(!employeesCodes || employeesCodes.size === 0  ) {
        res.send({
            statusCode:'NOK',
            results:null,
            message:"No employees are found in the company"
        });
        return;
    }
    
    const allsalaryData = await fetchAllSalary({companyCode, salaryMonth, salaryYear});

    const salariedEmployeeCodes = allsalaryData ? allsalaryData.map( (item) => item['employeeCode'] ) : [];

    const missingOnes = findMissingOnes( {srcArray : employeesCodes , targetArray : salariedEmployeeCodes } )

    if( missingOnes ) {
        res.send({
            statusCode:'NOK',
            results:null,
            message:`Salary is not processed for below employees ${missingOnes.join(" , ")}`
        });
    }else {
        res.send({
            statusCode:'OK',
            results:allsalaryData,            
            message:'Salary is processed for the company please click on Acknowledge button to generate Acknowledgement Slip'
        });
    }

    return;

});

router.post('/finalize' , async (req,res) => {
    const {companyCode, salaryMonth, salaryYear} = req.body;
    if( !companyCode || !salaryMonth || !salaryYear ) {
        res.send(null);
        return;
    }
    const allsalaryData = await fetchAllSalary({companyCode, salaryMonth, salaryYear});
    const promiseArray = allsalaryData.map(data => finalize(data));
    console.log(promiseArray);
    const response = await Promise.all(promiseArray);
    console.log(response);
    res.send(
        {
            statusCode:'OK',
            results:null,            
            message:'Salary is processed for the company. The Acknowledgement slip is being generated please wait'
        }
    );


});

module.exports = router;
