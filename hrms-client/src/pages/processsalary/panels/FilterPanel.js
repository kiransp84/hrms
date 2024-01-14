import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import {
    useRecoilState,
    useResetRecoilState
} from 'recoil';

import {AlertPanel} from '../../../components/common/alerts/AlertPanel';

const months = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const years = [-1, 0, 1, 2, 3, 4, 5];

const isNotEmpty = (value) => value && `${value}`.length > 0 

import {COMPANIES} from '../../../contants';

export default ({ currentMonth, currentYear, onSearch }) => {

    

    const [companyCode, setCompanyCode] = useState('');
    const [salaryMonth, setSalaryMonth] = useState(months[currentMonth + 1]);
    const [salaryYear, setSalaryYear] = useState(currentYear);
    const [message, setMessage] = useState(null);


    
    const onClickView = () => {
        const isValid = isNotEmpty(companyCode) && isNotEmpty(salaryMonth) && isNotEmpty(salaryYear) ;        
        if (isValid) {
            onSearch({companyCode,salaryMonth,salaryYear});
        }else {
            setMessage("Enter EmployeeId , SalaryMonth , Salary Year ");
        }
    }

    const onClickClear = () => {
    }

    return (
        <Container fluid>
            <Form>
                <Row>
                    <Col xs="4">
                        <FormGroup>
                            <Label for="exampleEmail">
                                Company Code
                </Label>
                        <select label="Company" name="companyCode" onChange={(e) => { setCompanyCode(e.target.value) }} >
                        [
                        {
                            <option value="">Select a Company</option>
                        },
                        {                    
                            COMPANIES.split(",").map(company=> <option value={company}>{company}</option>)
                        }
                        ]          
                        </select>
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
                            Search
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