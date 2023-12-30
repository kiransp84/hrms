const express = require('express')
const router = express.Router()

const EmployeePayrollModel = require('../schema/payroll/EmployeePayrollSchema');
const EmployeePayrollHistoryModel = require('../schema/payroll/EmployeePayrollHistorySchema');
const EmployeesModel = require('../schema/employee/EmployeeSchema');

router.get('/fetch', async (req, res) => {

    if (!req.query.employeeCode) {
        res.send(null);
        return;
    }

    const employeeExists = await EmployeesModel.findOne({ employeeCode: req.query.employeeCode }).lean();
    if (!employeeExists) {
        res.send(null);
        return;
    }

    console.log(' fetching payroll master for requested employeeCode ', req.query.employeeCode);
    let activepayroll = await EmployeePayrollModel.findOne({ employeeCode: req.query.employeeCode }).lean();
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
    });

});

router.post('/save', async (req, res) => {
    const lookUp = { employeeCode: req.body.employeeCode };

    const employeeExists = await EmployeesModel.findOne(lookUp).lean();
    if (!employeeExists) {
        res.send(null);
        return;
    }

    let activepayroll = await EmployeePayrollModel.findOne(lookUp).lean();
    if (activepayroll) {
        const document = await EmployeePayrollModel.findOneAndUpdate(lookUp,
            req.body
        );
        console.log(document);
        res.send({
            statusCode: 'OK',
            results: document,
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

    await employeePayrollModel.save(); 

    res.send({
        statusCode: 'OK',
        results: employeePayrollModel,
    });
    return;

});

module.exports = router;