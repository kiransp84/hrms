import axios from 'axios';

import { SERVER } from '../contants';
import { calculateActual } from '../pages/generatesalary/formulas';

export const fetchSalaryForMonth = ({ employeeCode, salaryMonth, salaryYear }) => {

    if (!employeeCode || !salaryMonth || !salaryYear) {
        return;
    }

    if (employeeCode.length === 0 || salaryMonth.length === 0 || salaryYear.length === 0) {
        alert(' Enter EmployeeCode , SalaryMonth and SalaryYear ');
        return;
    }

    return axios({
        method: 'post',
        url: `${SERVER}/bff/salary/fetchSalaryForMonth`,
        responseType: 'json',
        data: { employeeCode, salaryMonth, salaryYear }
    }).then(function (response) {
        console.log(' Got list from server ', response.data);
        return response.data;
    });

}

const copyValueAsNumber = (target, source, keys) => {
    for (let key of keys) {
        target[key] = Number(source[key]);
    }
}

export const saveSalary = ({results},{salaryMonth,salaryYear}) => {
    const {salaryDetails,payrollDetails,employeeDetails} =results;
    const data ={
        salaryMonth,
        salaryYear,
        ...salaryDetails ,
        ...payrollDetails,
        ...employeeDetails
    }
    return axios({
        method: 'post',
        url: `${SERVER}/bff/salary/saveSalaryForMonth`,
        responseType: 'json',
        data
    }).then(function (response) {
        console.log(' Got list from server ', response.data);
        return response.data;
    });
}

export const estimateSalary = (salaryData, {salaryMonth,salaryYear}, values) => {
    /*console.log(' salaryData ',salaryData);
    console.log(' filterData ',filterData);
    console.log(' values ',values);*/
    const {results:{payrollDetails}} = salaryData;
    let salaryProps = {};
    copyValueAsNumber(salaryProps, values, ['daysofattendance', 'lossofpaydays', 'numberofweeklyoffgranted', 'overtimewages', 'leavewages', 'nationalFestivalHolidayswages', 'maternityBenefit',
        'advances', 'welfareFund', 'professionalTax', 'deductionofFine', 
        'deductionforLossDamages', 'otherDeduction','modeofPayment','numberofLeavegranted']);

        
    salaryProps['dateofPayment'] = values['dateofPayment'];
    salaryProps['actualBasic'] = calculateActual(payrollDetails.basicPay, salaryProps['daysofattendance'], salaryMonth , salaryYear );
    salaryProps['actualDA'] = calculateActual(payrollDetails.dearnessAllowance, salaryProps['daysofattendance'], salaryMonth , salaryYear );
    salaryProps['grossMonthlyWages'] = Math.round(salaryProps['actualBasic']  + salaryProps['actualDA'])  ;

    salaryProps['actualHRA'] = calculateActual(payrollDetails.houseRentAllowance, salaryProps['daysofattendance'], salaryMonth , salaryYear );    
    salaryProps['actualCityCompensationallowances'] = calculateActual(payrollDetails.cityCompensationAllowance, salaryProps['daysofattendance'], salaryMonth , salaryYear );
    salaryProps['actualOtherAllowances'] = calculateActual(payrollDetails.otherAllowances, salaryProps['daysofattendance'], salaryMonth , salaryYear );

    salaryProps['totalAmount'] =  Math.round(salaryProps['grossMonthlyWages']  + salaryProps['actualHRA'] + salaryProps['actualCityCompensationallowances']  + salaryProps['overtimewages'] +
    salaryProps['leavewages'] +  salaryProps['nationalFestivalHolidayswages'] + salaryProps['maternityBenefit'] +   salaryProps['actualOtherAllowances'])  ;

    salaryProps['employeesProvidentFund'] = Math.round( ( salaryProps['grossMonthlyWages'] * 10 ) / 100 ) ;
    salaryProps['employeesStateInsurance'] = Math.round( ( salaryProps['grossMonthlyWages'] * .75 ) / 100 ) ;

    salaryProps['totalDeduction'] =  Math.round(salaryProps['employeesProvidentFund']  + salaryProps['employeesStateInsurance'] + salaryProps['otherDeduction']  + salaryProps['deductionforLossDamages'] +
    salaryProps['deductionofFine'] +  salaryProps['professionalTax'] + salaryProps['welfareFund'] + salaryProps['advances'] )  ;

    salaryProps['netwagespaid'] = Math.round(salaryProps['totalAmount']  - salaryProps['totalDeduction'] );


    return {
        ...salaryData,
        ...{
            results: {
                ...salaryData.results,
                salaryDetails: salaryProps
            }
        }
    };
}