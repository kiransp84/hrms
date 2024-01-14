import React, { useState } from "react";

import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';

import MyTextField from '../../../../components/common/html/MyTextField';
import MyButton from '../../../../components/common/html/MyButton';

import FooterPanel from '../panels/FooterPanel';
import schema from '../../../../schema/salaryMaster'

import {useRecoilValue} from 'recoil';
import {salaryState} from '../../recoil'; 
export default ({ onCalculate , onSave }) => {

  const {results={}} =  useRecoilValue(salaryState);

  const {salaryDetails={}} = results ? results : {} ;
  const initialValues = {
    daysofattendance:'0',
    lossofpaydays:'0',
    numberofLeavegranted:'0',
    numberofweeklyoffgranted:'0',
    overtimewages:'0',
    leavewages:'0',
    nationalFestivalHolidayswages:'0',
    maternityBenefit:'0',
    advances:'0',
    welfareFund:'0',
    professionalTax:'0',
    deductionofFine:'0',
    deductionforLossDamages:'0',
    otherDeduction:'0',
    dateofPayment:'0',
    ...salaryDetails
  };

  return <Formik
    enableReinitialize={true}
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={async (values, { setSubmitting }) => {
      // To-Do validate values 
      onCalculate(values);
      setSubmitting(false);
      //processResponse(response);
    }}>
    <Form>
      <Card>
        <CardHeader>
          Enter the input fields to calculate salary
            </CardHeader>
        <ListGroup flush>
          <ListGroupItem>
            <Row>
              <Col xs="6">
                <MyTextField
                  label="Days of attendance"
                  name="daysofattendance"
                  type="text"
                  placeholder=""
                  title="Enter Days of attendance"
                />
              </Col>
              <Col xs="6">
                <MyTextField
                  label="Loss of pay days"
                  name="lossofpaydays"
                  type="text"
                  placeholder=""
                  title="Enter Loss of pay days"
                />
              </Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col xs="6">
                <MyTextField
                  label="Number of Leaves Granted"
                  name="numberofLeavegranted"
                  type="text"
                  placeholder=""
                  title="Enter Number of Leaves Granted"
                />
              </Col>
            </Row>
          </ListGroupItem>          
          
          <ListGroupItem>
            <Row>
              <Col xs="6">
                <MyTextField
                  label="Number of weekly off granted"
                  name="numberofweeklyoffgranted"
                  type="text"
                  placeholder=""
                  title="Enter Number of weekly off granted"
                />
              </Col><Col xs="6">
                <MyTextField
                  label="Overtime wages"
                  name="overtimewages"
                  type="text"
                  placeholder=""
                  title="Enter Overtime wages"
                />
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col xs="6">
                <MyTextField
                  label="Leave wages"
                  name="leavewages"
                  type="text"
                  placeholder=""
                  title="Enter Leave wages"
                />
              </Col><Col xs="6">
                <MyTextField
                  label="National & Festival Holidays wages"
                  name="nationalFestivalHolidayswages"
                  type="text"
                  placeholder=""
                  title="Enter National & Festival Holidays wages"
                />
              </Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row><Col xs="6">
              <MyTextField
                label="Maternity Benefit"
                name="maternityBenefit"
                type="text"
                placeholder=""
                title="Enter Maternity Benefit"
              />
            </Col><Col xs="6">
                <MyTextField
                  label="Advances"
                  name="advances"
                  type="text"
                  placeholder=""
                  title="Enter Advances"
                />
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row><Col xs="6">
              <MyTextField
                label="Welfare Fund"
                name="welfareFund"
                type="text"
                placeholder=""
                title="Enter Welfare Fund"
              />
            </Col><Col xs="6">
                <MyTextField
                  label="Professional Tax"
                  name="professionalTax"
                  type="text"
                  placeholder=""
                  title="Enter Professional Tax"
                />
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row><Col xs="6">
              <MyTextField
                label="Deduction of Fine"
                name="deductionofFine"
                type="text"
                placeholder=""
                title="Enter Deduction of Fine"
              />
            </Col><Col xs="6">
                <MyTextField
                  label="Deduction  for  Loss & Damages"
                  name="deductionforLossDamages"
                  type="text"
                  placeholder=""
                  title="Enter Deduction  for  Loss & Damages"
                />
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row><Col xs="6">
              <MyTextField
                label="Other Deduction"
                name="otherDeduction"
                type="text"
                placeholder=""
                title="Enter Other Deduction"
              />
            </Col><Col xs="6">
            <MyTextField
                label="Date of Payment"
                name="dateofPayment"
                type="date"
                placeholder=""
                title="Enter Date of Payment"
              />                
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col xs="6">
                <MyButton type="submit" label="Estimate" />
              </Col>
              <Col xs="6">
                <FooterPanel onSave={onSave} />
              </Col>
            </Row>
          </ListGroupItem>          
        </ListGroup>
      </Card>
    </Form>
  </Formik>
}
