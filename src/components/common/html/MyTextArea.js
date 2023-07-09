import React from 'react';
import {useField } from 'formik';

const MyTextArea = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <p><label htmlFor={props.name}>{label}</label></p>
        <textarea className="text-input" id={props.name} name={props.name} rows={props.rows} cols={props.cols} {...field} {...props} ></textarea>
        <br></br>      
        {meta.touched && meta.error ? (
          <>
          <div className="error">{meta.error}</div>
          <br></br>
          </>
        ) : null}
        
      </>
    );
  };

export default MyTextArea;