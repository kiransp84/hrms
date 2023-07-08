import React from 'react';
import { Formik, Form, useField } from 'formik';

import schema from '../schema/employee';
import MyTextField from './common/html/MyTextField'; 
import MySelectField from './common/html/MySelectField'; 
import MyCheckboxField from './common/html/MyCheckboxField'; 
import MyButton from './common/html/MyButton';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    acceptedTerms: false, // added for our checkbox
    jobType: '', // added for our select
};

// And now we can use these
const CreateEmployeeForm = () => {
  return (
    <>
      <h1>Create Employee Screen</h1>
      <Formik
        initialValues
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextField
            label="First Name"
            name="firstName"
            type="text"
            placeholder=""
          />

          <MyTextField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder=""
          />

          <MyTextField
            label="Email Address"
            name="email"
            type="email"
            placeholder=""
          />

          <MySelectField label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelectField>

          <MyCheckboxField name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckboxField>

          <MyButton type="submit" label="Submit"/>
        </Form>
      </Formik>
    </>
  );
};

export default CreateEmployeeForm;