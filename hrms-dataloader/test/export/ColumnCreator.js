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

const createValue = (excelRow,data) => {
    excelRow['v'] = data;
}

const createType = (excelRow,columnMeta) => {
    excelRow['t'] = mapping[columnMeta.dataType];
}

const createStyle = (excelRow,columnMeta) => {
    excelRow['s'] = columnMeta.style;
}

module.exports = createColumn;