import React, { useState } from "react";

import {Card,CardHeader,ListGroup,ListGroupItem} from 'reactstrap';
import { Formik, Form } from 'formik';

import MyTextField from '../../../../components/common/html/MyTextField';
import MyButton from '../../../../components/common/html/MyButton';

export default () => {
    const initialValues = {
    };

    return <Formik
    initialValues={initialValues}
        /*validationSchema={schema}*/
        onSubmit={ async (values, { setSubmitting }) => {
            //const response = await saveEmployees(values);
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
            <MyTextField
                  label="Days of attendance"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                            <MyTextField
                  label="Loss of pay days"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                            <MyTextField
                  label="Number of weekly off granted"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
            </ListGroupItem>
            <ListGroupItem>
            <MyTextField
                  label="Overtime wages"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                            <MyTextField
                  label="Leave wages"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                            <MyTextField
                  label="National & Festival Holidays wages"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
            </ListGroupItem>
            <ListGroupItem>
            <MyTextField
                  label="Maternity Benefit"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                            <MyTextField
                  label="Advances"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                            <MyTextField
                  label="Welfare Fund"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
            </ListGroupItem>
            <ListGroupItem>
            <MyTextField
                  label="Professional Tax"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                            <MyTextField
                  label="Deduction of Fine"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                            <MyTextField
                  label="Deduction  for  Loss & Damages"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
            </ListGroupItem>
            <ListGroupItem>
            <MyTextField
                  label="Other Deduction"
                  name="employeeCode"
                  type="text"
                  placeholder=""
                  title="Enter Employee Code / Employee Id"
                />
                <MyButton type="submit" label="Submit" />
            </ListGroupItem>                                                                                                                   
            </ListGroup>
            </Card>
        </Form>    
        </Formik>
}
