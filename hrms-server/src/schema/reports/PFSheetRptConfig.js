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
            datAttribute: 'uan',
            headCell: 'UAN',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'memberName',
            headCell: 'MEMBER NAME',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'grossWages',
            headCell: 'GROSS WAGES',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'epfWages',
            headCell: 'EPF WAGES',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'epsWages',
            headCell: 'EPS WAGES',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'edliWages',
            headCell: 'EDLI WAGES',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'epfContribRemitted',
            headCell: 'EPF CONTRI REMITTED',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'epsContribRemitted',
            headCell: 'EPS CONTRI REMITTED',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'epfepsDiffRemitted',
            headCell: 'EPF EPS DIFF REMITTED',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'ncpDays',
            headCell: 'NCP DAYS',
            dataType:'string',
            style:{
                ...commonStyle
            }
        },
        {
            datAttribute: 'refundAdvances',
            headCell: 'REFUND ADVANCES',
            dataType:'string',
            style:{
                ...commonStyle
            }
        }
    ]
}