import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

import CreateEmployeeForm from '../panels/CreateEmployeeForm';

import {usefindOneEmployee} from '../../../hooks/fetchEmployees';

export default () => {
    const  { state }    = useLocation();
    const {id} = state ? state : {} ;
    if( !id ) {        
        return <CreateEmployeeForm/>
    }else {
        const {employee,error,isLoading} = usefindOneEmployee(id);
        if(isLoading)
            return <div>Loading</div>
        if(error)
            return <div>Error : {error}</div>
        if(employee)
            return <CreateEmployeeForm employeeData={employee} />;
    }
    
}