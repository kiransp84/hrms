require('../src/environment')();
const EmployeeDataImporter = require('../src/documents/types/xlsx/importer/EmployeeDataImporter');
const EmployeeDataSource = require('../src/documents/types/xlsx/importer/EmployeeDataSource');

(async ()=>{
    const ds = new EmployeeDataSource(
        'employees/EMPLOYEES.xlsx',
        'Employee Master'
    );

    const importer = new EmployeeDataImporter(ds);

    try{
        const status = await importer.import();
        console.log(' Import Success ');
        importer.cleanup();
        process.exit();
    }catch(e) {
        console.log(' Import Failure . Check logs for details',e);
        importer.cleanup();
        process.exit();
    }
})();







