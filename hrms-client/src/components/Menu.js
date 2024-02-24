import React from 'react';

import {Link} from 'react-router-dom';

export default () => (
    <ul>
        <li>
            <Link to="/masters/create" title="Maintain Designation and Company ">Masters</Link>
        </li>           
        <li>
            <Link to="/employee/create" title="Create an Employee">Create Employee</Link>
        </li>
        <li>
            <Link to="/employee/list" title="View or Modify Employees">View Employees</Link>
        </li>
        <li>
            <Link to="/employee/payroll" title="Manage payscale of an Employee">View Payroll</Link>
        </li>   
        <li>
            <Link to="/employee/generatesalary" title="Edit Attendamce Data and Generate Salary of an Employee">Generate Salary</Link>
        </li>   
        <li>
            <Link to="/employee/processSalary" title="Generate Various Reports against a Company">Reports</Link>
        </li>       
        {/*<li>
            <Link to="/general/reports">Reports</Link>
        </li>               
        */}          
    </ul>
)