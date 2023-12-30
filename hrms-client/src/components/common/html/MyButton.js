import React from 'react';

import {useFormikContext } from 'formik';

const MyButton = ({ label, onClick , ...props }) => {
    const { isValid , values } = useFormikContext();
    const title="Please correct all validation errors to continue";
    // normal button 
    if(props.type === 'button'){        
        return (
            <button type={props.type} disabled={props.disabled} title={!isValid ? title : 'Submit'} onClick={()=>{
                console.log('values ',values);
                onClick(values);
            }}>
            {label}
            </button> 
        )
    }
    //submit button 
    return (
        <button type={props.type} disabled={!isValid} title={!isValid ? title : 'Submit'}>
        {label}
        </button> 
    )
};

export default MyButton;