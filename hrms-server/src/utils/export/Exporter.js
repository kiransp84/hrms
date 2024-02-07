const path = require("path");
const XLSX = require("xlsx-js-style");
require('../../environment')();

const {transform,transformHeader,addEmptyRow,fetchColumnCount} = require('./ObjectToRowTransformer');
const {createCustomCell} = require('./ColumnCreator');

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

        ws['!cols'] = fixedColumnWidths(3,40);



        XLSX.utils.book_append_sheet(wb, ws, sheetNameFn(row) );




    })

    // STEP 4: Write Excel file to directory 
    const fullFilePath = path.resolve( process.cwd() , 'temp' , folderName , fileNameFn() );
    XLSX.writeFile(wb, fullFilePath , {cellStyles: true} );

    // STEP 5 : return path to caller 
    return fullFilePath;
}

const performExport = ( rows =[[]] , config = {} , {
    sheetName = '',
    folderName = 'reports',
    fileName = '' ,
    reportTitle = ''
}
) => {

    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();

    // STEP 2: Create data rows and styles
    const rowsTransform = rows.map(row=>transform(row,config)) 
    //console.log(' rowsTransform before feeding ', rowsTransform );
    
    // STEP 3: Create worksheet with rows; Add worksheet to workbook

    const rowsWithHeader = [
        [
            createCustomCell( reportTitle ,{ font: { bold: true, color: { rgb: "#0a0a0a" } , sz: 24 } , alignment: { vertical: "center" , horizontal : "center" }  } )
        ],
        transformHeader(config),
        addEmptyRow(config),
        addEmptyRow(config),
        addEmptyRow(config),
        ...rowsTransform,
        addEmptyRow(config)
    ]
    const ws = XLSX.utils.aoa_to_sheet(rowsWithHeader);
    //            {s:{ r:0 },e:{r:1}},
    /*if(titleRange) {
        ws["!merges"] = [

            
            XLSX.utils.decode_range(titleRange)
        ];
    }*/
    const rowMerge = (startRowIndex,endRowIndex,columnStartIndex,columnEndIndex) => {
        let mergeList = [];
        for( col = columnStartIndex ; col <= columnEndIndex ; col++ ) {
            mergeList.push(
                {
                    s :{r : startRowIndex , c : col },
                    e :{r : endRowIndex , c : col  }
                }
            )
        }
        return mergeList;
    }

    /*const fixedColumnWidths = (columnCount,fixed) => {
        let widths = [];
        for( col = 0 ; col <= columnCount ; col++ ) {
            widths.push(
                {
                   wch : fixed 
                }
            )
        }
        return widths;
    }*/

    const columnCount = fetchColumnCount(config);
    ws["!merges"] = [
        //...rowMerge(1,4,0,40),
        ...rowMerge(1,4,0,columnCount-1),
        {
            s :{r : 0 , c : 0 },
            e :{r : 0 , c : columnCount-1  }
        }
    ];

    //ws['!cols'] = fixedColumnWidths(41,40);



    XLSX.utils.book_append_sheet(wb, ws, sheetName );

    // STEP 4: Write Excel file to directory 
    const fullFilePath = path.resolve( process.cwd() , "temp" , folderName , fileName );
    XLSX.writeFile(wb, fullFilePath , {cellStyles: true} );

    // STEP 5 : return path to caller 
    return fullFilePath;

}

module.exports = {
    performExport,
    exportSpecial
};