import React, { useEffect, useState } from 'react';
import { Formik, Form , useFormikContext  } from 'formik';
import formik from 'formik';
import {
    Container, Row, Col, Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import MyTextField from '../../../components/common/html/MyTextField';
import MyButton from '../../../components/common/html/MyButton';
import {fetchPayrollMaster,savePayrollMaster} from '../../../hooks/fetchPayrollMaster';
import {HistoryPanel} from './HistoryPanel';

import schema from '../../../schema/payrollmaster';

import {AlertPanel} from "../../../components/common/alerts/AlertPanel";


const initialValuesDef = {
    employeeCode:'',
    version:'',
    basicPay:'',
    dearnessAllowance:'',
    houseRentAllowance:'',
    cityCompensationAllowance:'',
    otherAllowances:'',
    riskAllowances:''
};

const CreateEmployeePayrollForm = () => {

    const [payrollDetails,setPayrollDetails] = useState({});
    const [message, setMessage] = useState(null);

    const disableFields = payrollDetails.activepayroll ? false : true;

    let initialValues =  {
        ...initialValuesDef,
        ...payrollDetails.activepayroll
    }

    const fetchPayroll = async (values) => {
        const {statusCode,results,message} = await fetchPayrollMaster(values.employeeCode);
        if( results ){
            setPayrollDetails(results);        
        }
        if(message){
          setMessage(message);        
        }
    }

    const clear = () => {
      setPayrollDetails({});        
      setMessage(null);      
    }

    return (
        <>
          <h1>Create Employee</h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={ async (values, { setSubmitting }) => {
              const {statusCode,results,message} = await savePayrollMaster(values);
              setSubmitting(false);
              //processResponse(response);
              if( results ){
                setPayrollDetails(results);        
            }
            if(message){
              setMessage(message);        
            }
            }}
          >
            <Form>
              <Container fluid>
                <Row>
                  <Col xs="3">
                    <MyTextField
                      label="Employee Code"
                      name="employeeCode"
                      type="text"
                      placeholder=""
                      title="Enter Employee Code / Employee Id"
                    />
                  </Col>
                  <Col xs="3">
                    <MyButton type="button" label="List" onClick={fetchPayroll} />
                    <MyButton type="button" label="Clear" onClick={clear} />
                  </Col>
                </Row>   

                <Row>
                  <Col xs="3">
                    <MyTextField
                      label="Basic Pay"
                      name="basicPay"
                      type="number"
                      placeholder=""
                      title="Enter Basic Pay"
                      disabled={disableFields}
                    />
                  </Col>
                  <Col xs="3">
                    <MyTextField
                        label="Dearness Allowance"
                        name="dearnessAllowance"
                        type="number"
                        placeholder=""
                        title="Enter Dearness Allowance"
                        disabled={disableFields}
                        />                    
                  </Col>
                  <Col xs="3">
                    <MyTextField
                        label="House Rent Allowance"
                        name="houseRentAllowance"
                        type="number"
                        placeholder=""
                        title="Enter House Rent Allowance"
                        disabled={disableFields}
                        />                    
                  </Col>
                  <Col xs="3">
                    <MyTextField
                        label="City Compensation Allowance"
                        name="cityCompensationAllowance"
                        type="number"
                        placeholder=""
                        title="Enter City Compensation Allowance"
                        disabled={disableFields}
                        />                    
                  </Col>
                </Row>  

                <Row>   
                <Col xs="3">
                    <MyTextField
                        label="Other Allowances"
                        name="otherAllowances"
                        type="number"
                        placeholder=""
                        title="Enter Other Allowances"
                        disabled={disableFields}
                        />                    
                  </Col>
                  <Col xs="3">
                    <MyTextField
                        label="Risk Allowances"
                        name="riskAllowances"
                        type="number"
                        placeholder=""
                        title="Enter Risk Allowances"
                        disabled={disableFields}
                        />                    
                  </Col>
                </Row>                               
              </Container>
              <MyButton type="submit" label="Save"  />
            </Form>
          </Formik>
          {message? <AlertPanel message={message} /> : null  }      
          <HistoryPanel history={payrollDetails.history} /> 

          </>);
}

export default CreateEmployeePayrollForm;