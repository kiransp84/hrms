/**
 *  row = { key1 : value1 , key2 : value2 , .. }
 *  config = { columnMeta : [ {} , {} ] }
 */
const {createColumn,createColumnHeader} = require('./ColumnCreator');

const transform = (row,config) => {
    return config.columnMeta.map(
        (meta) => {
            const attr = meta.datAttribute;
            return createColumn(attr,row,meta)
        }
    )
}

const transformHeader = (config) => {
    return config.columnMeta.map(
        (meta) => {
            return createColumnHeader(meta.headCell)
        }
    )
}

module.exports = {
    transform,
    transformHeader
}