import React from 'react';

const MyButton = (props) => {
    return (
        <button type={props.type}>{props.label}</button> 
    )
};

export default MyButton;