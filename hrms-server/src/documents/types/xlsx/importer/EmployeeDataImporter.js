const XLSX = require('xlsx');
const {readFile} = require('./FileUtils');
const Employees = require('../../../../schema/employee/EmployeeSchema');
const {fieldNameMaping} = require('./EmployeeDataValidator');
const {initConnection,disconnectConnection} = require('../../../../database/init');
const moment = require('moment');

const DATEONLYFORMAT = 'DD-MMM-YYYY';

class EmployeeDataImporter {
    
    constructor(employeeDataSource) {
        this.initialize(employeeDataSource);
    }

    initialize(employeeDataSource){
        this.employeeDataSource = employeeDataSource;
    }

    setField( fieldMetaData, fieldValue ) {
        switch(fieldMetaData.type) {
            case 'date':
                const date = moment(fieldValue, DATEONLYFORMAT ).toDate();
                console.log(`IMPORT_DEBUG: mapped date fieldName ${fieldMetaData.fieldName} , RAW_VALUE ${fieldValue.toLocaleString()} with value ${date}`,)
                return date;
            default:
                return fieldValue;
        }
    }

    mapRows( dataRows ,headerRow ) {
        // To-Do validation before creating model 
        const models = dataRows.map((row,index)=> {
            const employeeModel = new Employees();
            row.forEach((datum,index)=> { 
                const headerColumnName = headerRow[index];
                const {fieldName} = fieldNameMaping[headerColumnName] ? fieldNameMaping[headerColumnName] : {} ;
                if( fieldName ) {
                    employeeModel[fieldName]=this.setField(fieldNameMaping[headerColumnName], datum );
                    console.log(`IMPORT_DEBUG: mapped fieldName ${fieldName} with value ${employeeModel[fieldName]}`,)
                }
                else    
                    console.log('IMPORT_DEBUG: unmapped column read from sheet ',headerColumnName)
            });
            return employeeModel;
        })
        return models;
    }

    async import() {
        const file = await readFile(this.employeeDataSource.relativepath);
        const options = { cellDates : true }
        const workbook = XLSX.read(file,options);

        const sheetName = workbook.SheetNames.filter( sheetName => this.employeeDataSource.sheetName === sheetName )[0];
        const currentSheet = workbook.Sheets[sheetName];
        
        const arrayOfArrays = XLSX.utils.sheet_to_json(currentSheet,{header:1 })
        
        //HARCODED FOR NOW
        const headerRowCount = 1;
        const headerRows = arrayOfArrays.slice(0,headerRowCount);

        console.log(' headerRow(s) ',headerRows);
        const header = headerRows[0];
        const noOfHeaderColumns = header.length;
        console.log(' noOfHeaderColumns ',noOfHeaderColumns);

        const dataRows = arrayOfArrays.slice(1);

        console.log(' dataRows ',dataRows);

        const models = this.mapRows(dataRows , header );

        
        // database connnectivity 
        initConnection();

        return Promise.all(
            models.map( 
                employeeModel => employeeModel.save())
        );

    }

    async cleanup() {
        disconnectConnection();
    }


};

module.exports = EmployeeDataImporter;