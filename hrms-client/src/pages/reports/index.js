import React , {useState,useEffect} from 'react';

import axios from 'axios';

export default () => {
    const [response,setResponse] = useState(null);
    const [responseSec,setResponseSec] = useState(null);
    const renderDownloadLink = () =>{
        return (<a href={window.URL.createObjectURL(response.data)} download="payslip.xlsx" >PaySlip Download</a> )
    }
    const renderDownloadLinkSec = () =>{
        return (<a href={window.URL.createObjectURL(responseSec.data)} download="salary_report.xlsx" >Salary Acknowledge Download</a> )
    }

    useEffect(()=>{
        const download = async () => {
            try {
                const response = await axios({
                  url:'/bff/reports/payslip',
                  method: 'GET',
                  responseType: 'blob',
                });
                setResponse(response);
              } catch (error) {
                console.log(error);
              }
        }
        download();
    },[]);

    useEffect(()=>{
        const download = async () => {
            try {
                const response = await axios({
                  url:'/bff/reports/salaryAckRpt',
                  method: 'GET',
                  responseType: 'blob',
                });
                setResponseSec(response);
              } catch (error) {
                console.log(error);
              }
        }
        download();
    },[]);    
    return ( 
        <>
        {!response ? (<div>first report generation in progress</div>): <>{renderDownloadLink()}</>}
        {!responseSec ? (<div>second report generation in progress</div>): <>{renderDownloadLinkSec()}</>}    
        </>
        )
    ;

}