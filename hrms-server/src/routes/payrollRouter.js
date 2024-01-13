const express = require('express')
const router = express.Router()

const EmployeePayrollModel = require('../schema/payroll/EmployeePayrollSchema');
const EmployeePayrollHistoryModel = require('../schema/payroll/EmployeePayrollHistorySchema');
const EmployeesModel = require('../schema/employee/EmployeeSchema');

const validateEmployee = async (employeeCode, res ) =>{
    const employeeExists = await EmployeesModel.findOne({ employeeCode: employeeCode }).lean();
    if (!employeeExists) {
        res.send({
            statusCode: 'NOK',
            results: null,
            message: "Invalid Employee Code"
        });
        throw Error("Invalid Employee Code");
    }
}



router.get('/fetch', async (req, res) => {

    const employeeCode = req.query.employeeCode;

    if (!employeeCode) {
        res.send(null);
        return;
    }

    try {
        await validateEmployee(employeeCode, res)
    }catch( err ) {
        return;
    }
    

    console.log(' fetching payroll master for requested employeeCode ', req.query.employeeCode);
    let activepayroll = await EmployeePayrollModel.findOne({ employeeCode: req.query.employeeCode }).lean();
    let showCreationMessage = false;
    if (!activepayroll) {
        activepayroll = {
            employeeCode: req.query.employeeCode,
            basicPay: '',
            dearnessAllowance: '',
            houseRentAllowance: '',
            cityCompensationAllowance: '',
            otherAllowances: '',
            riskAllowances: ''
        }
        showCreationMessage = true;
    }

    console.log(' fetching payroll history for requested employeeCode ', req.query.employeeCode);
    const history = await EmployeePayrollHistoryModel.find({ employeeCode: req.query.employeeCode }).lean();
    if (!history) {
        history = [];
    }

    const response = {
        activepayroll,
        history
    }

    res.send({
        statusCode: 'OK',
        results: response,
        message: showCreationMessage ? "Enter the payroll details and click to save": null 
    });

});

router.post('/save', async (req, res) => {
    const lookUp = { employeeCode: req.body.employeeCode };

    try {
        await validateEmployee(req.body.employeeCode, res)
    }catch( err ) {
        return;
    }

    let activepayroll = await EmployeePayrollModel.findOne(lookUp).lean();
    if (activepayroll) {
        const document = await EmployeePayrollModel.findOneAndUpdate(lookUp,
            req.body
        );
        console.log(document);
        let activepayrollAfterSave = await EmployeePayrollModel.findOne({ employeeCode: req.body.employeeCode }).lean();
        const historyAfterSave = await EmployeePayrollHistoryModel.find({ employeeCode: req.body.employeeCode }).lean();
        const response = {
            activepayroll : activepayrollAfterSave,
            history : historyAfterSave
        }
        res.send({
            statusCode: 'OK',
            results: response,
            message: "Payroll info saved successfully"
        });
        return;
    }

    let employeePayrollModel = new EmployeePayrollModel();
    employeePayrollModel.employeeCode = req.body.employeeCode;
    employeePayrollModel.basicPay = req.body.basicPay;
    employeePayrollModel.dearnessAllowance = req.body.dearnessAllowance;
    employeePayrollModel.houseRentAllowance = req.body.houseRentAllowance;
    employeePayrollModel.cityCompensationAllowance = req.body.cityCompensationAllowance;
    employeePayrollModel.otherAllowances = req.body.otherAllowances;
    employeePayrollModel.riskAllowances = req.body.riskAllowances;
    employeePayrollModel.modeOfPayment = req.body.modeOfPayment;

    await employeePayrollModel.save(); 

    let activepayrollAfterSave = await EmployeePayrollModel.findOne({ employeeCode: req.body.employeeCode }).lean();
    const historyAfterSave = await EmployeePayrollHistoryModel.find({ employeeCode: req.body.employeeCode }).lean();

    const response = {
        activepayroll : activepayrollAfterSave,
        history : historyAfterSave
    }


    res.send({
        statusCode: 'OK',
        results: response,
        message: "Payroll info saved successfully"
    });
    return;

});

module.exports = router;