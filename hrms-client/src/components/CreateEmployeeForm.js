import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import schema from '../schema/employee';
import MyTextField from './common/html/MyTextField';
import MyButton from './common/html/MyButton';

import ContactPanel from './ContactInformation';
import EmploymentDetailsPanel from './EmploymentDetailsPanel';
import PersonalDetailsPanel from './PersonalDetailsPanel'
import BankInfoPanel from './BankInfoPanel';
import IdentityInfoPanel from './IdentityInfoPanel';
import NomineeDetailsPanel from './NomineeDetailsPanel';


import {
  Container, Row, Col, Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import {saveEmployees} from '../hooks/saveEmployees';
import { Alert } from 'reactstrap';

function AlertExample(props) {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      {props.message}
    </Alert>
  );
}

const initialValues = {
  firstName: '',
  lastName: '',
  offemail: '',
  acceptedTerms: false, // added for our checkbox
  designation: '', // added for our select
  employeeCode: '',
  jobLocation: '',
  dob: '',
  addressofficial: '',
  addresspersonal: '',
  phoneofficialone: '',
  phonePersonal: ''
};

// And now we can use these
const CreateEmployeeForm = () => {
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
        onSubmit={ async (values, { setSubmitting }) => {
          const response = await saveEmployees(values);
          setSubmitting(false);
          processResponse(response);
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
                <MyTextField
                  label="Name"
                  name="employeeName"
                  type="text"
                  placeholder=""
                />
              </Col>
              <Col xs="2">
                <MyButton type="submit" label="Submit" />
              </Col>
            </Row>
            <Row>
              <Col xs="6">
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
      {message? <AlertExample message={message} /> : null  }      
    </>
  );
}

export default CreateEmployeeForm;