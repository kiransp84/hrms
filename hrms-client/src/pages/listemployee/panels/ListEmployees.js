import React from 'react';

import {HGrid,Columns,HColumn,Cell,HeadCell,Content,RowCell} from '../../../components/common/grid';

import mockEmployees from './mockEmployees.json';

const ListEmployees = ({employees}) => {
    console.log(' using mock employees ',mockEmployees);
    return (
        <>
        <div>List Employees</div>
        <HGrid data={mockEmployees} >
        <Columns>
        <HColumn dataKey="name" label="Name" width={160} >
            <Cell>
                <HeadCell>
                    {(cellProps) => (
                        <Content>{cellProps.label}</Content>)
                    }
                </HeadCell>
                <RowCell>
                    {(cellProps) => (
                        <Content>{cellProps.cellData}</Content>)
                    }
                </RowCell>
            </Cell>
        </HColumn>
    </Columns>        
        </HGrid>
        </>
    )
}

export default ListEmployees;