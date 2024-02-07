const BORDER_STYLE = 'thin';
const COLOR_STYLE = { rgb: "#0a0a0a" };

const commonStyle = {
    font: { bold: false, color: { rgb: "#0a0a0a" } } , alignment : { wrapText : true },
    border:{
        top:{ style: BORDER_STYLE, color: COLOR_STYLE },
        bottom:{ style: BORDER_STYLE, color: COLOR_STYLE },
        left:{ style: BORDER_STYLE, color: COLOR_STYLE },
        right : { style: BORDER_STYLE, color: COLOR_STYLE }
    }
}

module.exports = {
    columnMeta: [
        {
            datAttribute: 'employeeCode',
            headCell: 'Employee Code',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'employeeName',
            headCell: 'Employee Name',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'companyCode',
            headCell: 'Company Code',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'designation',
            headCell: 'Designation',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'dateOfJoining',
            headCell: 'Date Of Joining',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'bankName',
            headCell: 'Bank Name',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'ifscCode',
            headCell: 'IFSC Code',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'accountNumber',
            headCell: 'Bank Account Number',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'daysofattendance',
            headCell: 'Days of attendance',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'lossofpaydays',
            headCell: 'Loss of pay days',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'numberofweeklyoffgranted',
            headCell: 'Number of weekly off granted',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'numberofLeavegranted',
            headCell: 'Number of Leave granted',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'basicPay'
            ,
            headCell: 'Basic',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'dearnessAllowance'
            ,
            headCell: 'DA',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            headCell: 'Actual Basic'
            ,
            datAttribute: 'actualBasic',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            headCell: 'Actual DA'
            ,
            datAttribute: 'actualDA',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            headCell: 'Gross Monthly Wages'
            ,
            datAttribute: 'grossMonthlyWages',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'houseRentAllowance'
            ,
            headCell: 'HRA',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'cityCompensationAllowance'
            ,
            headCell: 'City Compensation allowances',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'otherAllowances'
            ,
            headCell: 'Other Allowances',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'actualHRA'
            ,
            headCell: 'Actual HRA',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'actualCityCompensationallowances'
            ,
            headCell: 'Actual City Compensation Allowances',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'overtimewages'
            ,
            headCell: 'Overtime Wages',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'leavewages'
            ,
            headCell: 'Leave Wages',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'nationalFestivalHolidayswages'
            ,
            headCell: 'National & Festival Holidays Wages',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'maternityBenefit'
            ,
            headCell: 'Maternity Benefit',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'actualOtherAllowances'
            ,
            headCell: 'Actual Other Allowances',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'riskAllowances'
            ,
            headCell: 'Risk Allowances',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'totalAmount'
            ,
            headCell: 'Total Amount',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'employeesProvidentFund'
            ,
            headCell: 'Employees Provident Fund',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'employeesStateInsurance'
            ,
            headCell: 'Employees State Insurance',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'advances'
            ,
            headCell: 'Advances',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'welfareFund'
            ,
            headCell: 'Welfare Fund',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'professionalTax'
            ,
            headCell: 'Professional Tax',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'deductionofFine'
            ,
            headCell: 'Deduction of Fine',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'deductionforLossDamages'
            ,
            headCell: 'Deduction for Loss & Damages',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'otherDeduction'
            ,
            headCell: 'Other Deduction',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'totalDeduction'
            ,
            headCell: 'Total Deduction',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'netwagespaid'
            ,
            headCell: 'Net wages paid',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'modeOfPayment'
            ,
            headCell: 'Mode of Payment',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'dateofPayment'
            ,
            headCell: 'Date of Payment',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
    ]
}