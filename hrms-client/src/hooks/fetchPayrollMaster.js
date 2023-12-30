import axios from 'axios';

import {SERVER} from '../contants';

export const fetchPayrollMaster = (employeeCode) => {

    
    if(!employeeCode && employeeCode !== '' ) return;

    return axios({
        method: 'get',
        url: `${SERVER}/bff/payrollmaster/fetch?employeeCode=${employeeCode}`,
        responseType: 'json'
    })
    .then(function (response) {
        console.log(' Got list from server ', response.data);
        //if (response.data && response.data.statusCode === 'OK') {
          //  return response.data.results;
        //}
        return response.data;
    });
}


export const savePayrollMaster = (values) => {

    console.log(' data sent to the server ',values);
    return axios({
        method: 'post',
        url: `${SERVER}/bff/payrollmaster/save`,
        responseType: 'json',
        data:values
    })
    .then(function (response) {
        console.log(' Got response from server ', response.data);
        //if (response.data && response.data.statusCode === 'OK') {
          //  return response.data.results;
        //}
        return response.data;
    });
}