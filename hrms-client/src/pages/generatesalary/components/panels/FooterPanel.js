import React from 'react';
import MyButton from '../../../../components/common/html/MyButton'
import { useRecoilValue } from 'recoil';
import {salaryState} from '../../recoil';

export default ({onSave,onFinalize}) => {
    const {results} = useRecoilValue(salaryState);
    if(results ) {
        const {salaryDetails} = results;
        if(salaryDetails && salaryDetails.status === 'DRAFT')
        return (
            <>
                    <button type="button" onClick={onSave}>
                    Save As Draft
                    </button> 
                    &nbsp;
                    <button type="button" onClick={onFinalize}>
                    Finalize
                    </button>                     

            </>
        );
        if(salaryDetails && salaryDetails.status === 'FINAL')
        return (
            <>
                    <button type="button" disabled={true}>
                    Save As Draft
                    </button> 
                    &nbsp;
                    <button type="button" disabled={true}>
                    Finalize
                    </button> 

            </>
        );        
    }
    // enabled save button 
    return (
        <>
                <button type="button" onClick={onSave}>
                Save As Draft
                </button> 
                &nbsp;
                <button type="button" onClick={onFinalize}>
                Finalize
                </button>    
        </>     
    );
}