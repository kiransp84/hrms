import axios from 'axios';


export const fetchAllFinalizedSalaryForCompany = ({ companyCode, salaryMonth, salaryYear }) => {

    if (!companyCode || !salaryMonth || !salaryYear) {
        return;
    }

    if (companyCode.length === 0 || salaryMonth.length === 0 || salaryYear.length === 0) {
        alert(' Enter CompanyCode , SalaryMonth and SalaryYear ');
        return;
    }

    return axios({
        method: 'post',
        url: `/bff/salary/fetchAllFinalizedSalary`,
        responseType: 'json',
        data: { companyCode, salaryMonth, salaryYear }
    }).then(function (response) {
        console.log(' Got list from server ', response.data);
        return response.data;
    });

}




export const fetchProcessStatus = ({ companyCode, salaryMonth, salaryYear }) => {
    if (!companyCode || !salaryMonth || !salaryYear) {
        return;
    }
    return axios({
        method: 'post',
        url: `/bff/salary/fetchProcessStatus`,
        responseType: 'json',
        data: { companyCode, salaryMonth, salaryYear }
    }).then(function (response) {
        console.log(' Got list from server ', response.data);
        return response.data;
    });
}