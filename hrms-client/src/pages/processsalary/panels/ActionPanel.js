import React , {useState,useEffect} from 'react';

import {Button} from 'reactstrap';

import {
    useRecoilValue, useRecoilState,
  } from 'recoil';

import {companyState} from '../recoil';  
import { AlertPanel } from '../../../components/common/alerts/AlertPanel';
import { generateExcelReport } from '../../../hooks/reportActions';
import {ExportLink} from '../../../components/common/exportLink';


const actionMap = {
    salack:'salaryAckRpt',
    salsheet:'salarySheet',
    payslp:'payslip',
    epf:'monthlyPFSheet'
}
export default () => {
    //report filter criteria 
    const {results:[{companyCode,salaryMonth,salaryYear}]} = useRecoilValue(companyState);
    const [isEnabled,setEnabled] = useState(true);
    const [message,setMessage] = useState(false);
    
    const [response,setResponse] = useState(null);
    const [errors,setErrors] = useState(null);

    const processErrors = () => {
        setMessage("Failed");
    }

    const exportFn = async ({target:{dataset}}) => {
        
        setEnabled(false);
        setResponse(null);
        setMessage("Generation in progress");

        await generateExcelReport(
            'reports/'+actionMap[dataset['business']],
            {companyCode,salaryMonth,salaryYear},
            setResponse,
            processErrors
        );
        setMessage("Download Success");
        setEnabled(true);
    }

   return (<div>
   <Button color="primary" disabled={!isEnabled} onClick={exportFn} data-business="salack">Generate Salary Acknowledgement</Button>
   {' '}
   <Button color="success" disabled={!isEnabled} onClick={exportFn} data-business="salsheet">Generate Salary Sheet</Button>
   {' '}
   <Button color="info" disabled={!isEnabled} onClick={exportFn} data-business="payslp">Generate PaySlips</Button>
    {' '}
   <Button color="primary" disabled={!isEnabled} onClick={exportFn} data-business="epf">EPF Report</Button>
    {' '}
   {message ? <AlertPanel message={message}  onDismiss = {() => setMessage(null)} /> : null }
   {' '}
   {response ? <ExportLink response={response} fileName="report" fileExt="xlsx" linkName="Click to Download" /> : null }
   </div>)
}