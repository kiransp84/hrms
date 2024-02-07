const EmployeePayrollModel = require('../schema/payroll/EmployeePayrollSchema');

const findMissingOnes = ({ srcArray, targetArray }) => {
  const missing = srcArray.filter(src => !targetArray.find((e) => e === src));
  return missing.size === 0 ? undefined : missing
};

const copyValue = (target, source, keys) => {
  for (let key of keys) {
    target[key] = source[key];
  }
}

const populateEmployeeDetails = (salaryData, employeeList) => {
  return salaryData.map(
    salary => {
      const employeeFound = employeeList.find(employee => employee.employeeCode === salary.employeeCode);
      copyValue(salary, employeeFound, ['employeeName',
        'designation',
        'dateOfJoining',
        'bankName',
        'ifscCode',
        'accountNumber',
        'uan',
        'esiNumber'
      ])
      

    if( salary.dateOfJoining ) {    
      const formattedDate = salary.dateOfJoining.toISOString().split('T')[0];
      Object.assign(salary , { dateOfJoining : formattedDate } );    
    }

    if( salary.dateofPayment ) {    
      const formattedDate = salary.dateofPayment.toISOString().split('T')[0];
      Object.assign(salary , { dateofPayment : formattedDate } );    
    }

      return salary;
    }
  );
}

const populateActivePayrollDetails = (salaryData) => {
  const promiseArray = salaryData.map(
    async salary => {
        let activepayroll = await EmployeePayrollModel.findOne({ employeeCode : salary.employeeCode }).lean();
        copyValue(salary, activepayroll, [
          'basicPay',
          'dearnessAllowance',
          'houseRentAllowance',
          'cityCompensationAllowance',
          'otherAllowances',
          'riskAllowances'        
        ]);
        return salary;
    }
  );
  console.log(promiseArray);
  return Promise.all(promiseArray);
}

const computeSummary = (rows,columnNames = []) => {
  console.log(rows);
  const summary = {};
  columnNames.forEach(
    col => {
      let initialValue = 0 ; 
      const sum = rows.map((row) => row[col]).reduce(
        ( accum , current  )  => accum + current , 
        initialValue 
      );
      summary[col]=sum;
    }
  );
  return summary;
}

module.exports = {
  findMissingOnes,
  populateEmployeeDetails,
  populateActivePayrollDetails,
  computeSummary
}
