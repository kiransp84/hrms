import React, { useState } from "react";
import { Container,Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {
    useRecoilState,
} from 'recoil';
import { filterPanelState } from '../../recoil';

const months = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const years = [-1, 0, 1, 2, 3, 4, 5];

export default ({ currentMonth, currentYear }) => {

    console.log(' currentMonth ',currentMonth);

    const [filterState, setFilterState] = useRecoilState(filterPanelState);
    const [employeeCode, setEmployeeCode] = useState('');
    const [salaryMonth, setSalaryMonth] = useState('');
    const [salaryYear, setSalaryYear] = useState('');
    const onClickView = () => {
        console.log(employeeCode, salaryMonth, salaryYear);
        const isValid = true;
        if (isValid) {
            // server call to do 
            // store in recoil state 
            setFilterState({ employeeCode, salaryMonth, salaryYear });
        }
    }

    return (
        <Container fluid>
        <Form>
            <FormGroup>
                <Label for="exampleEmail">
                    Employee Code
                </Label>
                <Input
                    id="employeeCode"
                    name="employeeCode"
                    placeholder=""
                    type="text"
                    onChange={(e) => { setEmployeeCode(e.target.value) }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="currentMonth">
                    Month
                </Label>
                <Input
                    id="currentMonth"
                    name="currentMonth"
                    type="select"
                    onChange={(e) => { setSalaryMonth(e.target.value) }}
                >
                    {
                        months.map((month) => (
                            month === months[currentMonth+1] ? (<option value={month} selected >
                                {month}
                            </option>) : (<option value={month} >
                                {month}
                            </option>)
                        ))
                    }
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="currentYear">
                    Year
                </Label>
                <Input
                    id="currentYear"
                    name="currentYear"
                    type="select"
                    onChange={(e) => { setSalaryYear(e.target.value) }}
                >
                    {
                        years.map((indexxx) => (
                            indexxx ==0 ? (<option value={currentYear + indexxx} selected>
                                {currentYear + indexxx}
                            </option>) : (
                                <option value={currentYear + indexxx}>
                                {currentYear + indexxx}
                            </option>
                            )
                        ))
                    }
                </Input>
            </FormGroup>
            <Button type="button" onClick={onClickView}>
                View
            </Button>
        </Form>
        </Container>
    )
}