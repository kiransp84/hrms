import React from 'react';
import {useField } from 'formik';
import {Col} from 'reactstrap';

  const MySelectField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <Col>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </Col>
    );
  };

  export default MySelectField;