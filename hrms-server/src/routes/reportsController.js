const express = require('express')
const router = express.Router()

const { fetchAllFinalizedSalaryForReport } = require('../dao/salaryDao');
const { performExport, exportSpecial } = require('../utils/export/Exporter');
const salaryAckRptConfig = require('../schema/reports/SalaryAckRptConfig');
const { createCustomCell} = require('../utils/export/ColumnCreator');

router.get(`/salaryAckRpt`, async (req, res) => {

    // to-do remove hardcoding and do input validation 
    const { companyCode = 'IBS', salaryMonth = 'JAN', salaryYear = 2024 } = req.body;

    // data collection use dao 
    const salaryArray = await fetchAllFinalizedSalaryForReport({ companyCode, salaryMonth, salaryYear });

    // data formatting 

    // data exporting 
    const fileName = 'Report.xlsx';
    const filePath = performExport(salaryArray, salaryAckRptConfig,
        {
            sheetName: 'Salary Acknowledgement',
            fileName,
            reportTitle: 'Wages Acknowledgement for the Month September  2021',
            titleRange: "A1:AO1"
        });
    console.log(filePath);
    // data transmission 
    res.download(
        filePath,
        fileName, // Remember to include file extension
        (err) => {
            if (err) {
                res.send({
                    error: err,
                    msg: "Problem downloading the file"
                })
            }
        });
});


router.get("/payslip", async (req, res) => {
    // to-do remove hardcoding and do input validation 
    const { companyCode = 'IBS', salaryMonth = 'JAN', salaryYear = 2024 } = req.body;
    // comes from internally 
    const employeeCode = "E-100";

    // data collection use dao 
    const salaryArray = await fetchAllFinalizedSalaryForReport({ companyCode, salaryMonth, salaryYear });

    const bodyRows = (salaryItem)=> {

        const header1 = [createCustomCell(`PAY SLIP FOR THE MONTH OF ${salaryMonth}-${salaryYear}`)];
        const header2 = [createCustomCell(`Under Rule 29(2)(b) of there Kerala Contract Labour Rules,1970  FORM XI`)];
        const row1 = [createCustomCell("NAME"), createCustomCell(salaryItem.employeeName), createCustomCell("UAN (EPF)"), createCustomCell(salaryItem.uan)];
        const row2 = ["EMPLOYEE CODE", salaryItem.employeeCode, "ESI NUMBER", salaryItem.esiNumber];
        const row3 = ["DESIGNATION", salaryItem.designation, "Attendence", salaryItem.daysofattendance];
        const row4 = [
            "EARNINGS",
            "AMOUNT",
            "DEDUCTIONS",
            "AMOUNT"
        ];
        const row5 = [
            "Basic(Actual)",
            salaryItem.actualBasic,
            "PF",
            salaryItem.employeesProvidentFund
        ];
        const row6 = [
            "DA (Actual)",
            salaryItem.actualDA,
            "ESI",
            salaryItem.employeesStateInsurance
        ];
        const row7 = [
            "HRA (Actual)",
            salaryItem.actualHRA,
            "L.W.F",
            salaryItem.welfareFund
        ];
        const row8 = [
            "CCA",
            salaryItem.actualCityCompensationallowances,
            "PT",
            salaryItem.professionalTax
        ];
        const row9 = [
            "Other Allowances (Actual)",
            salaryItem.actualOtherAllowances,
            "ADVANCE",
            salaryItem.advances
        ];
        const row10 = ["", "", "", ""];
        const row11 = [
            "GROSS TOTAL",
            salaryItem.totalAmount,
            "TOTAL DEDUCTION",
            salaryItem.totalDeduction
        ];
        const row12 = [
            "NET PAY",
            salaryItem.netwagespaid
        ];
        const aoa = [
            header1,
            header2,
            row1,
            row2,
            row3,
            row4,
            row5,
            row6,
            row7,
            row8,
            row9,
            row10,
            row11,
            row12
        ];
        return aoa;        

    }

    const filePath =  exportSpecial({
        rows:salaryArray,
        bodyRows,
        metaData:{
            sheetNameFn : (row)=>`PaySlip-${row.employeeCode}`,
            fileNameFn : ()=> `${salaryMonth}-${salaryYear}-PaySlip.xlsx`  ,
            headerRange:["A1:D1","A2:D2"],
            footerRange:["B14:D14"]
        }
    })

    // data transmission 
    res.download(
        filePath,
        `${salaryMonth}-${salaryYear}-PaySlip.xlsx` , // Remember to include file extension
        (err) => {
            if (err) {
                res.send({
                    error: err,
                    msg: "Problem downloading the file"
                })
            }
    });

})


module.exports = router;