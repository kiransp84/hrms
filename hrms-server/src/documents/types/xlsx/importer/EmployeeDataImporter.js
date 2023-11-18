const XLSX = require('xlsx');
const {readFile} = require('./FileUtils');
const EmployeesModel = require('../../../../schema/employee/EmployeeSchema');
const {fieldNameMaping} = require('./EmployeeDataValidator');
const {initConnection,disconnectConnection} = require('../../../../database/init');
const moment = require('moment');
//
const {Error}= require('mongoose');

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
        const employeeDTOs = dataRows.filter((row)=>{
            // skip empty rows 
            return row[headerRow.findIndex((header) => header === 'Employee code')];
        }).map((row,index)=> {
            const employeeDTO = new Object();
            row.forEach((datum,index)=> { 
                const headerColumnName = headerRow[index];
                const {fieldName} = fieldNameMaping[headerColumnName] ? fieldNameMaping[headerColumnName] : {} ;
                if( fieldName ) {
                    employeeDTO[fieldName]=this.setField(fieldNameMaping[headerColumnName], datum );
                    console.log(`IMPORT_DEBUG: mapped fieldName ${fieldName} with value ${employeeDTO[fieldName]}`,)
                }
                else    
                    console.log('IMPORT_DEBUG: unmapped column read from sheet ',headerColumnName)
            });
            return employeeDTO;
        })
        return employeeDTOs;
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
                async employeeDTO => {
                    console.log(' read one employee with employeeCode ',employeeDTO.employeeCode);
                    const lookUp = { employeeCode : employeeDTO.employeeCode };
                    const optional = await EmployeesModel.findOne( lookUp ).exec();                    
                    try{
                        if( optional ) {
                            await EmployeesModel.replaceOne( lookUp , employeeDTO  );
                        }else{
                            let employeeModel = new EmployeesModel();
                            Object.keys(employeeDTO).map( src =>{
                                employeeModel[src] = employeeDTO[src];       
                            });
                            await employeeModel.save();
                        }
                    } catch (err) {
                        console.error(' Got error ');
                        if( err instanceof Error.ValidationError)
                            console.error(' Validation Error : In Fields ',Object.keys(err.errors));
                        else 
                            console.error(' Error Info  ',err);
                        //To-Do should we roll back the whole import even if one record has issue 
                        throw err;
                    }                    
                }
            )
        );

    }

    async cleanup() {
        disconnectConnection();
    }


};

module.exports = EmployeeDataImporter;