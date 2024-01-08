import React , {useEffect,useState} from 'react';
import {useRecoilValue} from 'recoil';
import Immutable from 'immutable'; 

import {AlertPanel} from '../../../../components/common/alerts/AlertPanel';

import SalaryPreviewPanel from '../panels/SalaryPreviewPanel';
import {salaryState} from '../../recoil';

//To-Do use a recoil selector 
const calculateSalaryData = (salaryData ) => {
    let salaryDetails = {
        ...salaryData.salaryDetails,
        ...salaryData.employeeDetails,
        ...salaryData.payrollDetails
    }
    return [salaryDetails];
}

export default () => {
    const {statusCode,results,message} = useRecoilValue(salaryState);
    const [salaryDetails , setSalaryDetails] = useState([]);

    useEffect(
        ()=>{
            if(results)
                setSalaryDetails(calculateSalaryData(results));
            else 
                setSalaryDetails([]);
        },
        [results]
    );
    const salaryData = Immutable.List(
        salaryDetails
    );
    return (
        <>
        {message ? <AlertPanel message={message} /> : null  }
        {salaryData && salaryData.size ==1 && salaryData.get(0).daysofattendance > 0   ?<SalaryPreviewPanel salaryData={salaryData} /> : null}
        </>
    )
}