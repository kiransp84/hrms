import React from 'react';

import {
    useSetRecoilState,
    useRecoilValue,
    useResetRecoilState
  } from 'recoil';

import {fetchSalaryForMonth,estimateSalary} from '../../../../hooks/fetchSalaryData';

import {salaryState,filterPanelState} from '../../recoil';

import DetailsPanel from '../panels/DetailsPanel';

export default () => {
    const setSalaryState = useSetRecoilState(salaryState);
    const salaryStateValue = useRecoilValue(salaryState);
    const filterPanelStateValue = useRecoilValue(filterPanelState);
    const reset = useResetRecoilState(salaryState);

    const fetchSalaryCallFn = async (args)=>{
       const response = await fetchSalaryForMonth(args);
       //console.log('response got ',response);
       setSalaryState(response);
    }

    const estimateSalaryFn = (values) => {
        reset();
        setSalaryState(estimateSalary(salaryStateValue,filterPanelStateValue,values));
    }

    return (
        <DetailsPanel 
        fetchSalaryCallFn={fetchSalaryCallFn} 
        estimateSalaryFn={estimateSalaryFn} />
    )
}