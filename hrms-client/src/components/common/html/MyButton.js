import React from 'react';

import {useFormikContext } from 'formik';

const MyButton = ({ label, ...props }) => {
    const { isValid } = useFormikContext();
    const title="Please correct all validation errors to continue"
    return (
        <button type={props.type} disabled={!isValid} title={!isValid ? title : 'Submit'}>{label}</button> 
    )
};

export default MyButton;