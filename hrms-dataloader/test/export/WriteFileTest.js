const config = require('./ExcelConfig');
const exportUtil = require('./Exporter');

let rows = [
    {
        font : "Courier: 24" ,
        color : "bold & color" ,
        fill : "fill: color" ,
        format : "line\nbreak" 
    },
    {
        font : "Courier: 24 sdasd" ,
        color : "bold & color asdasd" ,
        fill : "fill: color asdasd" ,
        format : "line\nbreak sadasdasd " 
    },
    {
        font : "Courier: 24 " ,
        color : "bold & color " ,
        fill : "fill: color " ,
        format : "line\nbreak  " 
    }        
]

exportUtil(rows,config,{
    sheetName : 'New',
    fileName : 'New.xlsx' ,
    directory : '',
} );