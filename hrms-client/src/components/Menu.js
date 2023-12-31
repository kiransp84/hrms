import React from 'react';

import {Link} from 'react-router-dom';

export default () => (
    <ul>
        <li>
            <Link to="/employee/create">Create Employee</Link>
        </li>
        <li>
            <Link to="/employee/list">View Employees</Link>
        </li>
        <li>
            <Link to="/employee/payroll">View Payroll</Link>
        </li>   
        <li>
            <Link to="/employee/generatesalary">Generate Salary</Link>
        </li>                
    </ul>
)