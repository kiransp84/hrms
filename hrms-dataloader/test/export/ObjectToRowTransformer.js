/**
 *  row = { key1 : value1 , key2 : value2 , .. }
 *  config = { columnMeta : [ {} , {} ] }
 */
const createColumn = require('./ColumnCreator');

const transform = (row,config) => {
    return config.columnMeta.map(
        (meta) => {
            const attr = meta.datAttribute;
            return createColumn(attr,row,meta)
        }
    )
}

module.exports = {
    transform
}