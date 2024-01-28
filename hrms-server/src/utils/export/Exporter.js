const path = require("path");
const XLSX = require("xlsx-js-style");
require('../../environment')();

const {transform,transformHeader} = require('./ObjectToRowTransformer');

const exportSpecial = (
    {
        rows =[[]] ,
        headerRows = (row)=>{ return []},
        bodyRows = (row)=>{ return []} ,
        footerRows = (row)=>{ return []},
        metaData : {
            sheetNameFn = ()=> { return ''},
            folderName = 'reports',
            fileNameFn = ()=> { return ''} ,
            headerRange,        
            footerRange            
        }
    }
) => {
    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();

    rows.map(row => {
        
        const sheetRows = [
            ...headerRows(row),
            ...bodyRows(row),
            ...footerRows(row)
        ];
        console.log(sheetRows);
        const ws = XLSX.utils.aoa_to_sheet(sheetRows);

        if(headerRange && headerRange.length > 0 && footerRange && footerRange.length > 0  ) {
            ws["!merges"] = 
                headerRange.map(
                    range => XLSX.utils.decode_range(range)
                )
                .concat(
                    footerRange.map(
                        range => XLSX.utils.decode_range(range)
                    )
                );
        }

        XLSX.utils.book_append_sheet(wb, ws, sheetNameFn(row) );




    })

    // STEP 4: Write Excel file to directory 
    const fullFilePath = path.resolve( process.env.basePath , folderName , fileNameFn() );
    XLSX.writeFile(wb, fullFilePath , {cellStyles: true} );

    // STEP 5 : return path to caller 
    return fullFilePath;
}

const performExport = ( rows =[[]] , config = {} , {
    sheetName = '',
    folderName = 'reports',
    fileName = '' ,
    reportTitle = '',
    titleRange
}
) => {

    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();

    // STEP 2: Create data rows and styles
    const rowsTransform = rows.map(row=>transform(row,config)) 
    //console.log(' rowsTransform before feeding ', rowsTransform );
    
    // STEP 3: Create worksheet with rows; Add worksheet to workbook

    const rowsWithHeader = [
        [reportTitle],
        transformHeader(config),
        ...rowsTransform
    ]
    const ws = XLSX.utils.aoa_to_sheet(rowsWithHeader);
    if(titleRange) {
        ws["!merges"] = [
            XLSX.utils.decode_range(titleRange),  
        ];
    }


    XLSX.utils.book_append_sheet(wb, ws, sheetName );

    // STEP 4: Write Excel file to directory 
    const fullFilePath = path.resolve( process.env.basePath , folderName , fileName );
    XLSX.writeFile(wb, fullFilePath , {cellStyles: true} );

    // STEP 5 : return path to caller 
    return fullFilePath;

}

module.exports = {
    performExport,
    exportSpecial
};