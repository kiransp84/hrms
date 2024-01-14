
const EmployeesModel = require('../schema/employee/EmployeeSchema');

const {List} = require('immutable')

// returns a list of employeeCodes  
const fetchEmployees = async ({companyCode}) => {
    const query = EmployeesModel.find(); // `query` is an instance of `Query`
    query.setOptions({ lean : true });
    query.where('companyCode').equals(companyCode);
    query.and([{ status : 'Active' }]);
    const results = await query.exec();
    return List(results);
}

module.exports = {
    fetchEmployees
}