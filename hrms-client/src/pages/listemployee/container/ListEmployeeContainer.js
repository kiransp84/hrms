import React from 'react';

import ListEmployees from '../panels/ListEmployees';
import {useFetchEmployees} from '../../../hooks/fetchEmployees';

export default () => {
    const employees = useFetchEmployees();
    return <ListEmployees employees={employees} />
}