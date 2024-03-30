
const path = require("path");
const XLSX = require("xlsx-js-style");

const { createCustomCell } = require('../../utils/export/ColumnCreator');

const constructRow = (columns) => columns.map(col => createCustomCell(col,
    { font: { bold: typeof col === 'string', color: { rgb: "#0a0a0a" }, sz: 15 }, alignment: { vertical: "center", horizontal: "center", wrapText: true } }
));

const bodyRows = (records) => {
    const aoa = records.map( record => [
        record.serialNumber,
        record.employeeName,
        record.accountNumber,
        record.bankName,
        record.ifscCode,
        record.netAmount,
    ]);
    return aoa;
};

const bankReportExport = (
    {
        bankDetailsMap = new Map(),
        companyName = '',
        salaryMonth,
        salaryYear,
        folderName = 'reports'
    }
) => {

    console.log('exportSpecial ENTRY ',bankDetailsMap,companyName,salaryMonth,salaryYear);

    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();


    bankDetailsMap.forEach( ( records , bankName ) => {

        console.log(' adding sheet name : ',bankName);
        const sheetRows = [
            [""],
            [createCustomCell(
                `BANK DETAILS REPORT ${salaryMonth}-${salaryYear}`,
                { font: { bold: true, color: { rgb: "#0a0a0a" }, sz: 15 }, alignment: { vertical: "center", horizontal: "center" } }
            )],
            [createCustomCell(
                `NAME OF BANK ${bankName}`,
                { font: { bold: true, color: { rgb: "#0a0a0a" }, sz: 15 }, alignment: { vertical: "center", horizontal: "center" } }
            )],
            [createCustomCell(
                `COMPANY NAME ${companyName}`,
                { font: { bold: true, color: { rgb: "#0a0a0a" }, sz: 15 }, alignment: { vertical: "center", horizontal: "center" } }
            )],
            [""],
            [""],
            constructRow(["SL No.","EMPLOYEE NAME","ACCOUNT NUMBER","BANK NAME","IFSC CODE","NET AMOUNT"]),
            ...bodyRows(records)
        ];
        console.log(sheetRows);
        const ws = XLSX.utils.aoa_to_sheet(sheetRows);
        // apply merge 
        const headerRange= ["A2:F2", "A3:F3" , "A4:F4" ];
        ws["!merges"] = headerRange.map(
            range => XLSX.utils.decode_range(range)
        );
        const fixedColumnWidths = (columnCount,fixed) => {
            let widths = [];
            for( col = 0 ; col <= columnCount ; col++ ) {
                widths.push(
                    {
                       wch : fixed 
                    }
                )
            }
            return widths;
            }
    
        ws['!cols'] = fixedColumnWidths(5,25);
        XLSX.utils.book_append_sheet(wb, ws, bankName );
    })

    console.log('STEP 4: Write Excel file to directory ');
    // STEP 4: Write Excel file to directory 
    const fullFilePath = path.resolve( process.cwd() , 'temp' , folderName , "bank-report.xlsx" );
    XLSX.writeFile(wb, fullFilePath , {cellStyles: true} );

    // STEP 5 : return path to caller 
    return fullFilePath;
}

module.exports = {
    bankReportExport
};