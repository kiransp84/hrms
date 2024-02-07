const express = require('express')
const router = express.Router()

const { fetchAllFinalizedSalaryForReport } = require('../dao/salaryDao');
const { performExport, exportSpecial } = require('../utils/export/Exporter');
const salaryAckRptConfig = require('../schema/reports/SalaryAckRptConfig');
const salarySheetRptConfig = require('../schema/reports/SalarySheetRptConfig');
const { createCustomCell } = require('../utils/export/ColumnCreator');
const { computeSummary } = require('./utils');

router.post(`/salarySheet`, async (req, res) => {

    const { companyCode, salaryMonth, salaryYear } = req.body;

    // data collection use dao 
    const salaryArray = await fetchAllFinalizedSalaryForReport({ companyCode, salaryMonth, salaryYear });
    const rowData = [
        ...salaryArray,
        computeSummary(
            salaryArray,
            [
                'basicPay', 'dearnessAllowance',
                'actualBasic', 'actualDA',
                'grossMonthlyWages', 'houseRentAllowance',
                'cityCompensationAllowance', 'otherAllowances',
                'actualHRA', 'actualCityCompensationallowances',
                'overtimewages', 'leavewages',
                'nationalFestivalHolidayswages', 'maternityBenefit',
                'actualOtherAllowances', 'riskAllowances',
                'totalAmount', 'employeesProvidentFund',
                'employeesStateInsurance', 'advances',
                'welfareFund', 'professionalTax',
                'deductionofFine', 'deductionforLossDamages',
                'otherDeduction', 'totalDeduction',
                'netwagespaid'
            ]
        )
    ];

    // data formatting 
    // data exporting 
    const fileName = 'Report.xlsx';
    const filePath = performExport(rowData, salarySheetRptConfig,
        {
            sheetName: 'Salary Sheet',
            fileName,
            reportTitle: `Wages/Salary for the Month ${salaryMonth} ${salaryYear}`
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
})

router.post(`/salaryAckRpt`, async (req, res) => {

    const { companyCode, salaryMonth, salaryYear } = req.body;

    // data collection use dao 
    const salaryArray = await fetchAllFinalizedSalaryForReport({ companyCode, salaryMonth, salaryYear });

    const rowData = [
        ...salaryArray,
        computeSummary(
            salaryArray,
            [
                'basicPay',
                'dearnessAllowance',
                'grossMonthlyWages', 'houseRentAllowance',
                'cityCompensationAllowance',
                'otherAllowances',
                'riskAllowances',
                'totalAmount',
                'employeesProvidentFund',
                'employeesStateInsurance', 'advances',
                'welfareFund', 'professionalTax',
                'otherDeduction',
                'totalDeduction',
                'netwagespaid'
            ]
        )
    ];

    // data formatting 
    // data exporting 
    const fileName = 'Report.xlsx';
    const filePath = performExport(rowData, salaryAckRptConfig,
        {
            sheetName: 'Salary Acknowledgement',
            fileName,
            reportTitle: `Wages Acknowledgement for the Month ${salaryMonth}  ${salaryYear}`
        });

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


router.post("/payslip", async (req, res) => {
    // to-do remove hardcoding and do input validation 
    const { companyCode, salaryMonth, salaryYear } = req.body;

    // data collection use dao 
    const salaryArray = await fetchAllFinalizedSalaryForReport({ companyCode, salaryMonth, salaryYear });

    const constructRow = (columns) => columns.map(col => createCustomCell(col,
        { font: { bold: typeof col === 'string', color: { rgb: "#0a0a0a" }, sz: 15 }, alignment: { vertical: "center", horizontal: "center", wrapText: true } }
    ))
    const bodyRows = (salaryItem) => {

        const header1 = [createCustomCell(
            `PAY SLIP FOR THE MONTH OF ${salaryMonth}-${salaryYear}`,
            { font: { bold: true, color: { rgb: "#0a0a0a" }, sz: 15 }, alignment: { vertical: "center", horizontal: "center" } }
        )];
        const header2 = [createCustomCell(`Under Rule 29(2)(b) of there Kerala Contract Labour Rules,1970  FORM XI`)];
        const row1 = ["NAME", salaryItem.employeeName, "UAN (EPF)", salaryItem.uan];
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
            constructRow(row1),
            constructRow(row2),
            constructRow(row3),
            constructRow(row4),
            constructRow(row5),
            constructRow(row6),
            constructRow(row7),
            constructRow(row8),
            constructRow(row9),
            constructRow(row10),
            constructRow(row11),
            constructRow(row12)
        ];
        return aoa;

    }

    const filePath = exportSpecial({
        rows: salaryArray,
        bodyRows,
        metaData: {
            sheetNameFn: (row) => `PaySlip-${row.employeeCode}`,
            fileNameFn: () => `${salaryMonth}-${salaryYear}-PaySlip.xlsx`,
            headerRange: ["A1:D1", "A2:D2"],
            footerRange: ["B14:D14"]
        }
    })

    // data transmission 
    res.download(
        filePath,
        `${salaryMonth}-${salaryYear}-PaySlip.xlsx`, // Remember to include file extension
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