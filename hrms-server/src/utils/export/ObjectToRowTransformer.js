/**
 *  row = { key1 : value1 , key2 : value2 , .. }
 *  config = { columnMeta : [ {} , {} ] }
 */
const {createColumn,createColumnHeader,createEmptyColumn} = require('./ColumnCreator');

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

const fetchColumnCount = (config) => {
    return config.columnMeta.length;
}

const addEmptyRow = (config) => {
    return config.columnMeta.map(
        (meta) => {
            return createEmptyColumn(meta.headCell)
        }
    )
}

module.exports = {
    transform,
    transformHeader,
    addEmptyRow,
    fetchColumnCount
}