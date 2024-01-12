import React from 'react';
import MyButton from '../../../../components/common/html/MyButton'
import { useRecoilValue } from 'recoil';
import {salaryState} from '../../recoil';

export default ({onSave}) => {
    const {results} = useRecoilValue(salaryState);
    if(results ) {
        const {salaryDetails} = results;
        if(salaryDetails)
        return (
                    <button type="button" onClick={onSave}>
                    Save
                    </button> 
        );
    }
    return (
        <button type="button" disabled={true}>
        Save
        </button> 
);
}