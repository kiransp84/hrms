const mapping = {
    'string':'s'
}

/**
 * 
 * { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } }
 */
const createColumn = (identifier='',sourceObject={},columnMeta={}) => {
    let rowObject = {};
    createValue(rowObject,sourceObject[identifier]);
    createType(rowObject,columnMeta);
    createStyle(rowObject,columnMeta);
    return rowObject;
}

const BORDER_STYLE = 'thin';
const COLOR_STYLE = { rgb: "#0a0a0a" };
const commonStyle = {
    font: { bold: true, color: { rgb: "#0a0a0a" } , sz : 10 } , alignment : { horizontal : "center" , vertical : "center" , wrapText : true  } ,
    border:{
        top:{ style: BORDER_STYLE, color: COLOR_STYLE },
        bottom:{ style: BORDER_STYLE, color: COLOR_STYLE },
        left:{ style: BORDER_STYLE, color: COLOR_STYLE },
        right : { style: BORDER_STYLE, color: COLOR_STYLE }
    }
}

const createColumnHeader = (label) => {
    let rowObject = {};
    createValue(rowObject,label);
    createType(rowObject,{dataType:'string'});
    createStyle(rowObject,{ style : {  ...commonStyle } });
    return rowObject;
}

const createEmptyColumn = (label) => {
    let rowObject = {};
    return rowObject;
}



const createCustomCell = (value, style = { font: { bold: true, color: { rgb: "#0a0a0a" } }  }) => {
    return {
        t:'s',
        v:value,
        s:style
    }
}

const createValue = (excelRow,data) => {
    excelRow['v'] = data;
}

const createType = (excelRow,columnMeta) => {
    excelRow['t'] = mapping[columnMeta.dataType];
}

const createStyle = (excelRow,columnMeta) => {
    excelRow['s'] = columnMeta.style;
}

module.exports = {
    createColumn,
    createColumnHeader,
    createCustomCell,
    createEmptyColumn
}