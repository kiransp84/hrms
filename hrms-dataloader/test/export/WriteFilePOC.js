const XLSX = require("xlsx-js-style");// require("xlsx");

(async ()=> {

// STEP 1: Create a new workbook
const wb = XLSX.utils.book_new();

// STEP 2: Create data rows and styles
let row = [
	{ v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
	{ v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "FF0000" } } } },
	{ v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "E9E9E9" } } } },
	{ v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
];

// STEP 3: Create worksheet with rows; Add worksheet to workbook
const ws = XLSX.utils.aoa_to_sheet([row]);
XLSX.utils.book_append_sheet(wb, ws, "readme demo");

// STEP 4: Write Excel file to browser
XLSX.writeFile(wb, "D:/xlsx-js-style-demo.xlsx", {cellStyles: true} );

})();


/*

(async ()=> {
    
    var workbook = XLSX.utils.book_new();

    

    const data = [
        ["Name","Place","Animal","Thing"],
        ["Kiran","Trivandrum","Crow","Laptop"],
    ]

    const dataNew = [
        ["","","","","","","","","","","Wages Acknowledgement for the Month September  2021"],
        [
            {
                t:'s',
                v:'Sl No.',
                s:{
                    font: {
                        name: "arial"
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                        wrapText: '1', // any truthy value here
                    },
                    border: {
                        right: {
                            style: "thin",
                            color: "000000"
                        },
                        left: {
                            style: "thin",
                            color: "000000"
                        },
                    }
                }

            },'Employee Code','Employee Name','Designation','Attendance','Basic','DA','HRA','CCA','Other Allowance','Risk Allowances','Gross Amount','PF','ESI','L W F','Advance','PT','Other Deduction','Total Deduction','Net Amount','Signature'
        ],
        [
            '1','T-1001','Deepthi  S L','Manager','30','9120.00','2158.00','1450.00','200.00','1948.00','0.00','14876.00','1128.00','85.00','0.00','0.00','0.00','0.00','1213.00','13663.00'
        ]
    ]
    
    var worksheet = XLSX.utils.aoa_to_sheet(dataNew);

    worksheet['!cols'] = [{ wch: 10 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 },{ wch: 20 }]

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Salary Acknowledgement Sheet');

    XLSX.writeFile(workbook, "D:/Report.xlsx", {cellStyles: true});

})();


*/
