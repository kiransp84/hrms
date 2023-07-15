import React from 'react';
import { Formik, Form, useField } from 'formik';

import schema from '../schema/employee';
import MyTextField from './common/html/MyTextField'; 
import MySelectField from './common/html/MySelectField'; 
import MyCheckboxField from './common/html/MyCheckboxField'; 
import MyButton from './common/html/MyButton';
import MyTextArea from './common/html/MyTextArea';

const initialValues = {
    firstName: '',
    lastName: '',
    offemail: '',
    acceptedTerms: false, // added for our checkbox
    designation: '', // added for our select
    empId:'',
    jobLocation:'',
    dob:'',
    addressofficial:'',
    addresspersonal:'',
    phoneofficialone:'',
    phonePersonal:''
};

// And now we can use these
const CreateEmployeeForm = () => {
  return (
    <>
      <h1>Create Employee Screen</h1>
      <Formik
        initialValues={initialValues}
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
            label="Employee Id"
            name="empId"
            type="text"
            placeholder=""
          />

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
            label="Official Email Address"
            name="offemail"
            type="email"
            placeholder=""
          />

          <MySelectField label="Designation" name="designation">
            <option value="">Select a Designation</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelectField>

          <MySelectField label="Job Location" name="jobLocation">
            <option value="">Select a Location</option>
            <option value="TRV">Trivandrum</option>
            <option value="COK">Cochin</option>
          </MySelectField>

          <MyTextField
            label="Date of Birth"
            name="dob"
            type="date"
            id="dob"
            placeholder=""
          />

          <MyTextArea
                      label="Official Address"
                      name="addressofficial"
                      id="addressofficial"
                      placeholder=""
                      rows="4"
                      cols="50"
                    />

          <MyTextField
                      label="Contact No ( Official )"
                      name="phoneofficial"
                      type="text"
                      id="phoneofficial"
                      placeholder=""
                    />


          <MyTextArea
                      label="Personal Address"
                      name="addresspersonal"
                      id="addresspersonal"
                      placeholder=""
                      rows="4"
                      cols="50"
                    />

          <MyTextField
                      label="Contact No ( Personal )"
                      name="phonePersonal"
                      type="text"
                      id="phonePersonal"
                      placeholder=""
                    />

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