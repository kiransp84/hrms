const {List} = require('immutable');

const SalaryModel = require('../schema/salary/SalarySchema');

const {fetchEmployees} = require('./employeeDao');
const {populateEmployeeDetails,populateActivePayrollDetails} = require('../routes/utils');



// returns a immutable list  of salaryData 
const fetchAllSalary = async ({companyCode, salaryMonth, salaryYear}) => {
    const query = SalaryModel.find();
    query.setOptions({ lean : true });
    query.where('companyCode').equals(companyCode);
    query.and([{ salaryMonth : salaryMonth }, { salaryYear : salaryYear } , { status : "FINAL" }]);
    const results = await query.exec();
    return List(results);
}

const fetchAllFinalizedSalaryForReport = async ({companyCode, salaryMonth, salaryYear}) => {
    const employees = await fetchEmployees({companyCode,status:'Active'});
    const allsalaryData = await fetchAllSalary({companyCode, salaryMonth, salaryYear});
    const allsalaryDataChanged1 = populateEmployeeDetails(allsalaryData,employees);
    const allsalaryDataChanged2 = await populateActivePayrollDetails(allsalaryDataChanged1);
    return allsalaryDataChanged2;
}



module.exports = {
    fetchAllSalary,
    fetchAllFinalizedSalaryForReport
}