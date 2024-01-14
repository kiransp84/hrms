const SalaryModel = require('../schema/salary/SalarySchema');
const {List} = require('immutable')

// returns a immutable list  of salaryData 
const fetchAllSalary = async ({companyCode, salaryMonth, salaryYear}) => {
    const query = SalaryModel.find();
    query.setOptions({ lean : true });
    query.where('companyCode').equals(companyCode);
    query.and([{ salaryMonth : salaryMonth }, { salaryYear : salaryYear } ]);
    const results = await query.exec();
    return List(results);
}

const finalize = ({_id}) => {
    console.log(_id);
    return SalaryModel.findByIdAndUpdate(_id,{ status : 'DRAFT' }).exec();
}

module.exports = {
    fetchAllSalary,
    finalize
}