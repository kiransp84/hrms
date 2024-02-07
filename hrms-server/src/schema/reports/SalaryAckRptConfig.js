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
            datAttribute: 'daysofattendance',
            headCell: 'Attendance',
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
            headCell: 'CCA',
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
            headCell: 'Gross Amount',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },  
        {
            datAttribute: 'employeesProvidentFund'
            ,
            headCell: 'PF',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'employeesStateInsurance'
            ,
            headCell: 'ESI',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'welfareFund'
            ,
            headCell: 'LWF',
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
            datAttribute: 'professionalTax'
            ,
            headCell: 'PT',
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
            headCell: 'Net Amount',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'signature'
            ,
            headCell: 'Signature',
            dataType:'string',
            style:{
                ...commonStyle
            }
        }
    ]
}