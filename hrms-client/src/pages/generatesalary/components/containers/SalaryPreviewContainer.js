import React from 'react';

import SalaryPreviewPanel from '../panels/SalaryPreviewPanel';
import Immutable from 'immutable'; 

export default () => {
    const salaryData = Immutable.List(
        [
            {
                "employeeName":"Kiran",
                "employeeCode":"A-8259"
            }
        ]
    );
    return <SalaryPreviewPanel salaryData={salaryData} />
}