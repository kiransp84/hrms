import React ,{useState} from 'react';

import {
    useSetRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useRecoilState
  } from 'recoil';

  import {AlertPanel} from '../../../../components/common/alerts/AlertPanel';

import {fetchSalaryForMonth,estimateSalary,saveSalary} from '../../../../hooks/fetchSalaryData';

import {salaryState,filterPanelState} from '../../recoil';

import DetailsPanel from '../panels/DetailsPanel';

export default () => {
    const setSalaryState = useSetRecoilState(salaryState);
    const salaryStateValue = useRecoilValue(salaryState);
    const filterPanelStateValue = useRecoilValue(filterPanelState);
    const reset = useResetRecoilState(salaryState);
    const resetFilter = useResetRecoilState(filterPanelState);
    const resetSalary = useResetRecoilState(salaryState);
    const [message,setMessage] = useState(null);

    const fetchSalaryCallFn = async (args)=>{
       const response = await fetchSalaryForMonth(args);
       //console.log('response got ',response);
       setSalaryState(response);
    }

    const estimateSalaryFn = (values) => {
        reset();
        setSalaryState(estimateSalary(salaryStateValue,filterPanelStateValue,values));
    }

    const saveSalaryFn = async () => {
        const response = await saveSalary(salaryStateValue, filterPanelStateValue);
        if(response.statusCode === 'OK') {
                setMessage(response.message);
                resetSalary();
                reset();
                resetFilter();
        }
    }

    return (
        <>
            <DetailsPanel 
            fetchSalaryCallFn={fetchSalaryCallFn} 
            estimateSalaryFn={estimateSalaryFn} 
            saveSalaryFn={saveSalaryFn}/>
            {message ? <AlertPanel  message={message} /> : null  }
        </>
    )
}