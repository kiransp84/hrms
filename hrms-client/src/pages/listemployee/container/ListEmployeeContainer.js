import React from 'react';
import ListEmployees from '../panels/ListEmployees';
import {useFetchEmployees} from '../../../hooks/fetchEmployees';

export default () => {
    const employees = useFetchEmployees(); // List 
    return employees.size > 0 ? <ListEmployees employees={employees} /> : null; 
}