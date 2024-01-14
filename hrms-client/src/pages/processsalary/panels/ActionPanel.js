import React , {useState,useEffect} from 'react';

import {finalize,fetchProcessStatus} from '../../../hooks/processSalary';



import {
    useRecoilValue, useRecoilState,
  } from 'recoil';

import {companyState} from '../recoil';  
import { AlertPanel } from '../../../components/common/alerts/AlertPanel';

export default () => {
    const companyData = useRecoilValue(companyState);
    const [isEnabled,setEnabled] = useState(false);
    const [message,setMessage] = useState(false);

    const finalizeFn = async () => {
        console.log('before finalize');
        console.log(companyData.results);
        const {statusCode,results,message} = await finalize(companyData.results);        
        setMessage(message);                
    }

    useEffect(()=>{
        async function fetch() {
            const {results} = await fetchProcessStatus( 
                {
                    companyCode : companyData.results[0].companyCode , 
                    salaryMonth : companyData.results[0].salaryMonth , 
                    salaryYear : companyData.results[0].salaryYear
                }        
            );
            setEnabled(!results);
        }
        fetch();
    },[companyData]);

   return (<>
   <button type="button" disabled={!isEnabled} onClick={finalizeFn}>Finalize</button>
   {message ? <AlertPanel message={message} /> : null }
   </>)
}