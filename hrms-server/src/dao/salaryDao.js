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


const fetchBankReport = async ({companyCode, salaryMonth, salaryYear}) => {

    console.log('fetchBankReport ENTRY');

    const aggregate = SalaryModel.aggregate()
    .lookup({
        from:"employees",
        localField:"employeeCode",
        foreignField:"employeeCode",
        as:"details"
    }).match({
        companyCode,
        salaryMonth,
        salaryYear
    });

    const results = await aggregate.exec();
    //console.log(JSON.stringify(results));

    const trimmed = results.map(
        (result,serialNumber) => ({
            serialNumber,
            employeeName:result.details[0].employeeName,
            accountNumber: result.details[0].accountNumber,
            bankName:result.details[0].bankName,
            ifscCode:result.details[0].ifscCode,
            netAmount:result.netwagespaid
        })
    );
    //console.log(JSON.stringify(trimmed));
    // group by done in node js layer 
    let toMap = trimmed.reduce(
        (acc, obj ) => {
            if( acc.get(obj.bankName) ) {
                    //console.log(' existing bank >>> ');
                    acc.set( obj.bankName , [ ...acc.get(obj.bankName) , obj  ]);
                    return acc;
            } else {
                    //console.log(' new bank >>> ');
                    acc.set( obj.bankName , [ obj ]);
                    return acc;
            }
    
        },
        new Map()
    );
    
    console.log(toMap);

    return toMap;
}


module.exports = {
    fetchAllSalary,
    fetchAllFinalizedSalaryForReport,
    fetchBankReport
}