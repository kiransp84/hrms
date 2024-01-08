import axios from 'axios';

import {SERVER} from '../contants';

export const fetchSalaryForMonth = ({ employeeCode, salaryMonth, salaryYear }) => {
    
    if(!employeeCode || !salaryMonth || !salaryYear ) {
        alert(' Enter EmployeeCode , SalaryMonth and SalaryYear ');
        return;
    }

    if(employeeCode.length === 0  || salaryMonth.length === 0 || salaryYear.length === 0 ) {
        alert(' Enter EmployeeCode , SalaryMonth and SalaryYear ');
        return;
    }

    return axios({
        method: 'post',
        url: `${SERVER}/bff/salary/fetchSalaryForMonth`,
        responseType: 'json',
        data:{ employeeCode, salaryMonth, salaryYear }
    }).then(function (response) {
        console.log(' Got list from server ', response.data);
        return response.data;
    });

}

export const estimateSalary = (salaryData,filterData,values) => {
    /*console.log(' salaryData ',salaryData);
    console.log(' filterData ',filterData);
    console.log(' values ',values);*/
    let salaryProps = {};
    salaryProps['daysofattendance'] = values['daysofattendance'];
    salaryProps['lossofpaydays'] = values['lossofpaydays'];
    salaryProps['numberofweeklyoffgranted'] = values['numberofweeklyoffgranted'];
    salaryProps['overtimewages'] = values['overtimewages'];
    salaryProps['leavewages'] = values['leavewages'];
    salaryProps['nationalFestivalHolidayswages'] = values['nationalFestivalHolidayswages'];
    salaryProps['maternityBenefit'] = values['maternityBenefit'];
    salaryProps['advances'] = values['advances'];
    salaryProps['welfareFund'] = values['welfareFund'];
    salaryProps['professionalTax'] = values['professionalTax'];
    salaryProps['deductionofFine'] = values['deductionofFine'];
    salaryProps['deductionforLossDamages'] = values['deductionforLossDamages'];
    salaryProps['otherDeduction'] = values['otherDeduction'];



    return {
        ...salaryData, 
        ...{
            results: {
                ...salaryData.results,                
                salaryDetails : salaryProps
            }
        }
    };
}