require('../src/environment')();

const XLSX = require('xlsx');
const {readFile} = require('../src/documents/types/xlsx/importer/FileUtils');

(async ()=>{

    const file = await readFile('sample/xlsx/DateTimeNew.xlsx');
    const wb = XLSX.read(file, {cellDates: true});
    
    const currentSheet = wb.Sheets.Sheet1;
    const arrayOfArrays = XLSX.utils.sheet_to_json(currentSheet,{header:1 })
    
    console.log(arrayOfArrays)

    const dataRows = arrayOfArrays.slice(1);
    dataRows.map((row,R) => {
        console.log(typeof row[1]);
        console.log(row[1]);
        console.log(`
            ${row[1].w}
            ${row[1].toUTCString()}
            ${row[1].toString()}
            ${row[1].toLocaleString()}
            ${row[1].toUTCString()}
            ${row[1].toISOString()}
            ${row[1].toGMTString()}
            `
        )
            
          
    });

})();