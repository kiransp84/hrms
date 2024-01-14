import React ,{useCallback} from 'react';

import {List} from 'immutable';

import {
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  import {AlertPanel} from '../../../components/common/alerts/AlertPanel';

import {fetchAllSalaryForCompany} from '../../../hooks/processSalary';

import FilterPanel  from '../panels/FilterPanel';
import SalaryPreviewPanel  from '../panels/SalaryPreviewPanel';
import ActionPanel  from '../panels/ActionPanel';

import {companyState} from '../recoil';

export default () => {
    const currentMonth = new Date().getMonth(); 
    const currentYear = new Date().getFullYear();
    const [companyData,setCompanyData] = useRecoilState(companyState);
    const onSearchFn = useCallback(
        async (arg)=>{
            const response = await fetchAllSalaryForCompany(arg);
            setCompanyData(response);
        }
        ,
    []);
    return (
        <>
        <FilterPanel currentMonth={currentMonth} currentYear={currentYear} onSearch={onSearchFn} />
        {
                    ( companyData && companyData.statusCode === 'OK' ) ? (
                        <>
                        <SalaryPreviewPanel companyData={List(companyData.results)} />
                        {companyData.results && companyData.results.length > 0 ? <ActionPanel /> : null }
                        </>
                    ):
                    (companyData && companyData.statusCode === 'NOK' &&  companyData.message ) ? <AlertPanel message={companyData.message} ></AlertPanel> : null
        }
        </>
    );
}