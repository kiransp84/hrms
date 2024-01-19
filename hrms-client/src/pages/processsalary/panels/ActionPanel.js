import React , {useState,useEffect} from 'react';





import {
    useRecoilValue, useRecoilState,
  } from 'recoil';

import {companyState} from '../recoil';  
import { AlertPanel } from '../../../components/common/alerts/AlertPanel';

export default () => {
    const companyData = useRecoilValue(companyState);
    const [isEnabled,setEnabled] = useState(false);
    const [message,setMessage] = useState(false);

    const exportFn = async () => {
        alert('Export Excel Not Implemented');              
    }

   return (<>
   <button type="button" disabled={!isEnabled} onClick={exportFn}>Export As Excel Report</button>
   {message ? <AlertPanel message={message} /> : null }
   </>)
}