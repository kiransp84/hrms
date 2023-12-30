import React, { useEffect, useState } from 'react';

import { Table } from 'reactstrap';

export const HistoryPanel = ({history}) => {
    if( !history ) return null ;
    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Version
                    </th>
                    <th>
                        Basic Pay
                    </th>
                    <th>
                        Dearness Allowance
                    </th>
                    <th>
                        House Rent Allowance
                    </th>
                    <th>
                        City Compensation Allowance
                    </th>
                    <th>
                        Other Allowances
                    </th>
                    <th>
                        Risk Allowances
                    </th>                    
                </tr>
            </thead>
            <tbody>
                {
                    history && history.map(
                        (item )=>(
                                <tr key={item.version}>
                                <th scope="row">
                                    {item.version}
                                </th>
                                <td>
                                    {item.basicPay}
                                </td>
                                <td>
                                    {item.dearnessAllowance}
                                </td>
                                <td>
                                    {item.houseRentAllowance}
                                </td>
                                <td>
                                    {item.cityCompensationAllowance}
                                </td>
                                <td>
                                    {item.otherAllowances}
                                </td>
                                <td>
                                    {item.riskAllowances}
                                </td>                                
                            </tr>
                        )                        
                    )
                }
            </tbody>
            <tfoot>
                <th>
                { !history ? "No records found" : "" }
                </th>
            </tfoot>
        </Table>
    )
}









