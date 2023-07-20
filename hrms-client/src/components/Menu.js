import React from 'react';

import {Link} from 'react-router-dom';

export default () => (
    <ul>
        <li>
            <Link to="/employee/create">Create Employee</Link>
        </li>
        <li>
            <Link to="/employee/modify">Modify Employee</Link>
        </li>
        <li>
            <Link to="/employee/list">View Employees</Link>
        </li>
    </ul>
)