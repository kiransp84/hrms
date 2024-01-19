import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import {
    useRecoilState,
    useResetRecoilState
} from 'recoil';

import {AlertPanel} from '../../../../components/common/alerts/AlertPanel';

import { filterPanelState , salaryState } from '../../recoil';

const months = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const years = [-1, 0, 1, 2, 3, 4, 5];

const isNotEmpty = (value) => value && `${value}`.length > 0 

export default ({ currentMonth, currentYear, onList }) => {

    

    const [filterState, setFilterState] = useRecoilState(filterPanelState);
    const [employeeCode, setEmployeeCode] = useState('');
    const [salaryMonth, setSalaryMonth] = useState(months[currentMonth + 1]);
    const [salaryYear, setSalaryYear] = useState(currentYear);
    const [message, setMessage] = useState(null);

    const resetFilter = useResetRecoilState(filterPanelState);
    const resetSalary = useResetRecoilState(salaryState);

    
    const onClickView = () => {
        const isValid = isNotEmpty(employeeCode) && isNotEmpty(salaryMonth) && isNotEmpty(salaryYear) ;        
        if (isValid) {
            // server call to do 2 things 
            // validate employee and return the salary 
            onList({ employeeCode, salaryMonth, salaryYear });
            // store in recoil state 
            setFilterState({ employeeCode, salaryMonth, salaryYear });
            setMessage(null);
        }else {
            setMessage("Enter EmployeeId , SalaryMonth , Salary Year ");
        }

    }

    const onClickClear = () => {
        resetSalary();
        resetFilter();
        setEmployeeCode('');
    }

    return (
        <Container fluid>
            <Form>
                <Row>
                    <Col xs="4">
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
                                autoComplete ="off"
                                value={employeeCode}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="4">
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
                                        month === months[currentMonth + 1] ? (<option value={month} selected >
                                            {month}
                                        </option>) : (<option value={month} >
                                            {month}
                                        </option>)
                                    ))
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="4">
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
                                        indexxx == 0 ? (<option value={currentYear + indexxx} selected>
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
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <Button type="button" onClick={onClickView}>
                            View
                        </Button>
                        <Button type="button" onClick={onClickClear}>
                            Clear
                        </Button>                        
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {
                            message ? <AlertPanel message={message} /> : null 
                        }
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}