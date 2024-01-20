const SalaryModel = require('../schema/salary/SalarySchema');
const {List} = require('immutable')

// returns a immutable list  of salaryData 
const fetchAllSalary = async ({companyCode, salaryMonth, salaryYear}) => {
    const query = SalaryModel.find();
    query.setOptions({ lean : true });
    query.where('companyCode').equals(companyCode);
    query.and([{ salaryMonth : salaryMonth }, { salaryYear : salaryYear } , { status : "FINAL" }]);
    const results = await query.exec();
    return List(results);
}

module.exports = {
    fetchAllSalary
}