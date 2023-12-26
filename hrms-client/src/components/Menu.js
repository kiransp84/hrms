import React from 'react';

import {Link} from 'react-router-dom';

export default () => (
    <ul>
        <li>
            <Link to="/employee/create">Create Employee</Link>
        </li>
        <li>
            <Link to="/employee/modify" state={{'id':'658ab14be26314b1d8e8ec00'}} >Modify Employee</Link>
        </li>
        <li>
            <Link to="/employee/modify" state={{'id':'6522bb62f45d1ef9af2b5f44'}} >Modify Invalid Employee</Link>
        </li>
        <li>
            <Link to="/employee/list">View Employees</Link>
        </li>
    </ul>
)