import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Container, Row, Col, Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import schema from '../../../schema/employee';

import MyTextField from '../../../components/common/html/MyTextField';
import MyButton from '../../../components/common/html/MyButton';


import ContactPanel from './ContactInformation';
import EmploymentDetailsPanel from './EmploymentDetailsPanel';
import PersonalDetailsPanel from './PersonalDetailsPanel'
import BankInfoPanel from './BankInfoPanel';
import IdentityInfoPanel from './IdentityInfoPanel';
import NomineeDetailsPanel from './NomineeDetailsPanel';

import {saveEmployees} from '../../../hooks/saveEmployees';

import {AlertPanel} from "../../../components/common/alerts/AlertPanel";

import MasterTypeSelect from '../../../components/common/mastertype/MasterTypeSelect';


const initialValuesDef = {
  companyCode:'',
  employeeCode:'',
  employeeName: '',
  contactNumber:'',
  address:'',
  designation:'',
  dateOfJoining:'',
  status:'',
  lastWorkingDate:'',
  dateOfReleaving:'',
  remarks:'',
  guardian:'',
  gender:'',
  dateOfBirth:'',
  maritalStatus:'',
  pan:'',
  aadhaar:'',
  uan:'',
  epfNumber:'',
  esiNumber:'',
  welfareFundNumber:'',
  epfNominee:'',
  epfNomineeRelation:'',
  esiNominee:'',
  esiNomineeRelation:'',
  gpaIPNominee:'',
  gpaIPNomineeRelation:'',
  gratuityNominee:'',
  gratuityNomineeRelation:'',
};

// And now we can use these
const CreateEmployeeForm = ({employeeData = {}}) => {

  const initialValues = {
    ...initialValuesDef,
    ...employeeData
  }

  console.log(' initialValues ',initialValues);
  const [activeTab, setActiveTab] = useState(0);
  const [message, setMessage] = useState(null);
  const isActive = (index) => {
    return activeTab === index;
  }
  const processResponse = (response)=>{
    console.log('handle the UI side action for response ',response);
    if( response && response.data && response.status === 200  ) {
        if( response.data.statusCode &&  "OK" === response.data.statusCode ) {
          setMessage(` An employee with employee code ${response.data.results[0].employeeCode} is created `);
        }
    }
  }

  const renderPanel = () => {
    switch (activeTab) {
      case 0:
        return (
          <ContactPanel />
        );
      case 1:
        return (
          <EmploymentDetailsPanel />
        );
      case 2:
        return (
          <PersonalDetailsPanel />
        );
      case 3:
        return (
          <BankInfoPanel />
        );
      case 4:
        return (
          <IdentityInfoPanel />
        );
      case 5:
        return (
          <NomineeDetailsPanel />
        );
    }
  }

  return (
    <>
      <h1>Create Employee</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={ async (values, { setSubmitting , resetForm }) => {
          const response = await saveEmployees(values);
          setSubmitting(false);
          processResponse(response);
          resetForm({
            values:{
              ...initialValuesDef
            }
          });
        }}
      >
        <Form>
          <Container fluid>
		    <Container fluid className="filterpanel">
            <Row>
              <Col xs="4">
                <MyTextField
                  label="Employee Code"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />

              </Col>
              <Col xs="4">
                <MyTextField
                  label="Name"
                  name="employeeName"
                  type="text"
                  placeholder=""
                />
              </Col>
              <Col xs="4">
                <MasterTypeSelect masterType="companies" label="Company" name="companyCode" />
              </Col>              

            </Row>
			<Row>
			  <Col xs="4">
                <MyButton type="submit" label="Save" />
              </Col>
			</Row>
			</Container>
            <Row>
              <Col xs="12">
                <Nav tabs>

                  <NavItem>
                    <NavLink href="#" active={isActive(0)} onClick={() => { setActiveTab(0); }}>
                      Contact Information
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink href="#" active={isActive(1)} onClick={() => { setActiveTab(1); }}>
                      Employment Info
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink href="#" active={isActive(2)} onClick={() => { setActiveTab(2); }}>
                      Personal Info
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink href="#" active={isActive(3)} onClick={() => { setActiveTab(3); }}>
                      Bank Info
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink href="#" active={isActive(4)} onClick={() => { setActiveTab(4); }}>
                      Identitiy Info
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink href="#" active={isActive(5)} onClick={() => { setActiveTab(5); }}>
                      Nominees Info
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
            {
              renderPanel()
            }
          </Container>
        </Form>
      </Formik>
      {message? <AlertPanel message={message}  onDismiss = {() => setMessage(null)} /> : null  }      
    </>
  );
}

export default CreateEmployeeForm;