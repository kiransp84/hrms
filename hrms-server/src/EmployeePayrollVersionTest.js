require('./environment')();
const {initConnection,disconnectConnection} = require('./database/init');
const EmployeePayrollModel = require('./schema/payroll/EmployeePayrollSchema');

// database connnectivity 
initConnection();

///create flow test 
/*let employeeModel = new EmployeePayrollModel();
employeeModel.employeeCode="DUMMY1";
employeeModel.basicPay=2000;
employeeModel.dearnessAllowance=2000;
employeeModel.houseRentAllowance=2000;
employeeModel.cityCompensationAllowance=2000;
employeeModel.otherAllowances=2000;
employeeModel.riskAllowances=2000;


(async ()=>{
    await employeeModel.save(); 
})();
*/
////update flow test 

(async ()=>{
    const document = await EmployeePayrollModel.findOneAndUpdate({employeeCode:'DUMMY1'},
    {
        basicPay:8000
    }
    );    
    console.log(document);
})();







// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  console.log('Shutting down the server Closing all db connections');
  await disconnectConnection();
  console.log('Shut Down Complete');
  process.exit(0);
});


