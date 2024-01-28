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

const createColumnHeader = (label) => {
    let rowObject = {};
    createValue(rowObject,label);
    createType(rowObject,{dataType:'string'});
    createStyle(rowObject,{});
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
    createCustomCell
}