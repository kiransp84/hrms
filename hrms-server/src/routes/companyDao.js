const CompanyPayrollModel = require('../schema/company/CompanyPayroll') ;
const SalaryStatusModel = require('../schema/company/SalaryStatus');

const copyValue = (target, source, keys) => {
    for (let key of keys) {
      target[key] = source[key];
    }
  }

const fetchProcessStatus = async ({companyCode,salaryMonth,salaryYear}) => {
    const data = await SalaryStatusModel.findOne({companyCode,salaryMonth,salaryYear}).lean();
    if(!data) {
        return data;
    }

    console.log(' status ',data.status);
    return data.status;
}

const finalizeCompanyPayroll = (salaryData) => {

    const salaryStatusModel = new SalaryStatusModel();
    salaryStatusModel.companyCode = salaryData[0].companyCode;
    salaryStatusModel.salaryMonth = salaryData[0].salaryMonth;    
    salaryStatusModel.salaryYear = salaryData[0].salaryYear;    
    salaryStatusModel.status = 'FINAL';

    const promiseArray = [
        ...salaryData.map( salary => {
            const companyPayrollModel = new CompanyPayrollModel();
            copyValue(companyPayrollModel,salary,[
                'employeeCode','salaryMonth','salaryYear','companyCode',
                'daysofattendance','lossofpaydays','numberofweeklyoffgranted','numberofLeavegranted',
                'actualBasic','actualDA','grossMonthlyWages','actualHRA','actualCityCompensationallowances',
                'overtimewages','leavewages','nationalFestivalHolidayswages','maternityBenefit','actualOtherAllowances',
                'riskAllowances','totalAmount','employeesProvidentFund','employeesStateInsurance','advances','welfareFund',
                'professionalTax','deductionofFine','deductionforLossDamages','otherDeduction','totalDeduction','netwagespaid',
                'modeOfPayment','dateofPayment','employeeName','designation','dateOfJoining','bankName','ifscCode','accountNumber',
                'basicPay','dearnessAllowance','houseRentAllowance','cityCompensationAllowance','otherAllowances','riskAllowances'])
            companyPayrollModel['status']='FINAL';
            return companyPayrollModel.save();
        }),
        salaryStatusModel.save()
    ];
    return promiseArray;
}

module.exports = {
    finalizeCompanyPayroll,
    fetchProcessStatus
}