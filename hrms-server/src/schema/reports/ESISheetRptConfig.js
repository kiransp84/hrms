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
            datAttribute: 'ipNumber',
            headCell: 'IP Number (10 Digits)',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'ipName',
            headCell: 'IP Name ( Only alphabets and space )',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'attendance',
            headCell: 'No of Days for which wages paid/payable during the month',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'grossWages',
            headCell: 'Total Monthly Wages',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'reasonCodeForZeroWD',
            headCell: ' Reason Code for Zero workings days(numeric only; provide 0 for all other reasons- Click on the link for reference)',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'lastWorkingDate',
            headCell: 'Last Working Day ',
            dataType:'string',
            style:{
                ...commonStyle
            }
        }
    ]
}