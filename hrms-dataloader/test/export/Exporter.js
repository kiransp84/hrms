const XLSX = require("xlsx-js-style");// require("xlsx");
const {transform} = require('./ObjectToRowTransformer');
const path = require("path");

const exportUtil = ( rows =[[]] , config = {} , {
    sheetName = '',
    fileName = '' ,
    directory = '',
}
) => {

    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();

    // STEP 2: Create data rows and styles
    const rowsTransform = rows.map(row=>transform(row,config)) 
    //console.log(' rowsTransform before feeding ', rowsTransform );
    
    // STEP 3: Create worksheet with rows; Add worksheet to workbook
    const ws = XLSX.utils.aoa_to_sheet(rowsTransform);
    XLSX.utils.book_append_sheet(wb, ws, sheetName );

    // STEP 4: Write Excel file to directory 
    const base = "D:/"+directory;
    
    XLSX.writeFile(wb, path.resolve( base , fileName ) , {cellStyles: true} );

}

module.exports = exportUtil;