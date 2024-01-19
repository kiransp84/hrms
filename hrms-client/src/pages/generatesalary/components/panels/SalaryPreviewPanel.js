
import React, { useState } from 'react';

import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    CardHeader, ListGroup, ListGroupItem, Row, Col, Label
} from 'reactstrap';

const SalaryPreviewPanel = ({ salaryData }) => {

    const [open, setOpen] = useState('5');

    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

const createItem = (key, value, indicator ) => (<ListGroupItem>
        <Row>
            <Col xs="6">
                <Label>{key}</Label>
            </Col>
            <Col xs="6">
                <Label>
                    {value}
                </Label>
            </Col>
        </Row>
    </ListGroupItem>)

const createItem2 = (key1, value1 , key2 , value2 , indicator ) => (<ListGroupItem>
    <Row>
        <Col xs="2">
            <Label>{key1}</Label>
        </Col>
        <Col xs="2">
            <Label>
                {value1}
            </Label>
        </Col>
        <Col xs="2">
            <Label>{key2}</Label>
        </Col>
        <Col xs="2">
            <Label>
                {value2}
            </Label>
        </Col>        
        <Col xs="1">
            <Label>
                {indicator}
            </Label>
        </Col>                     
    </Row>
</ListGroupItem>)    

const createItem3 = (key, value, indicator ) => (<ListGroupItem>
    <Row>
        <Col xs="4">
            <Label>{key}</Label>
        </Col>
        <Col xs="4">
            <Label>
                {value}
            </Label>
        </Col>
        <Col xs="4">
            <Label>
                {indicator}
            </Label>
        </Col>
    </Row>
</ListGroupItem>)

    return salaryData.map(salaryRecord => (<div>
        <Accordion open={open} toggle={toggle}>
            <AccordionItem>
                <AccordionHeader targetId="1">Employee Details</AccordionHeader>
                <AccordionBody accordionId="1">
                    <ListGroup flush>
                        {
                            [
                                createItem('Employee code', salaryRecord.employeeCode),
                                createItem('Employee name', salaryRecord.employeeName),
                                createItem('Designation', salaryRecord.designation),
                                createItem('Date of joining', salaryRecord.dateOfJoining),
                                createItem('Bank Name', salaryRecord.bankName),
                                createItem('IFSC Code', salaryRecord.ifscCode),
                                createItem('Bank Account Number', salaryRecord.accountNumber),
                            ]
                        }
                    </ListGroup>
                </AccordionBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeader targetId="2">Attendance Details</AccordionHeader>
                <AccordionBody accordionId="2">
                    <ListGroup flush>
                        {
                            [
                                createItem('Days of attendance', salaryRecord.daysofattendance),
                                createItem('Loss of pay days', salaryRecord.lossofpaydays),
                                createItem('Number of weekly off granted', salaryRecord.numberofweeklyoffgranted),
                                createItem('Number of Leave granted', salaryRecord.numberofLeavegranted)
                            ]
                        }
                    </ListGroup>
                </AccordionBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeader targetId="3">Income Details </AccordionHeader>
                <AccordionBody accordionId="3">
                    <ListGroup flush>
                    {
                            [
                                createItem2(
                                    'Basic Pay', salaryRecord.basicPay,
                                    'Actual Basic ', salaryRecord.actualBasic,
                                    '(A)'
                                ),
                                createItem2(
                                    'DA', salaryRecord.dearnessAllowance,
                                    'Actual DA', salaryRecord.actualDA,
                                    '(B)'
                                ),
                                createItem3('Gross Monthly Wages', salaryRecord.grossMonthlyWages,'(C=A+B)'),
                                createItem2(
                                    'HRA', salaryRecord.houseRentAllowance,
                                    'Actual HRA', salaryRecord.actualHRA,
                                    '(D)'
                                ),                                                           
                                createItem2(
                                    'City Compensation allowances', salaryRecord.cityCompensationAllowance,
                                    'Actual City Compensation Allowances', salaryRecord.actualCityCompensationallowances,
                                    '(E)'
                                ),      
                                createItem2(
                                    'Other allowances', salaryRecord.otherAllowances,
                                    'Actual Other Allowances', salaryRecord.actualOtherAllowances,
                                    '(F)'
                                ),   
                                createItem3('Overtime wages', salaryRecord.overtimewages,'(G)'),
                                createItem3('Leave wages', salaryRecord.leavewages,'(H)'),
                                createItem3('National & Festival Holidays wages', salaryRecord.nationalFestivalHolidayswages,'(I)'),
                                createItem3('Maternity Benefit', salaryRecord.maternityBenefit,'(J)'),
                                createItem3('Risk Allowances', salaryRecord.riskAllowances,'(Not Used)'),
                                createItem3('Total Amount', salaryRecord.totalAmount,'(C+D+E+F+G+H+I+J)'),                                  
                            ]
                        }
                    </ListGroup>
                </AccordionBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeader targetId="4">Deductions</AccordionHeader>
                <AccordionBody accordionId="4">
                    <ListGroup flush>
                    {
                            [

                                createItem3('employeesProvidentFund', salaryRecord.employeesProvidentFund,'(K)'),
                                createItem3('employeesStateInsurance', salaryRecord.employeesStateInsurance,'(L)'),
                                createItem3('advances', salaryRecord.advances,'(M)'),
                                createItem3('welfareFund', salaryRecord.welfareFund,'(N)'),
                                createItem3('professionalTax', salaryRecord.professionalTax,'(O)'),
                                createItem3('deductionofFine', salaryRecord.deductionofFine,'(P)'),
                                createItem3('deductionforLossDamages', salaryRecord.deductionforLossDamages,'(Q)'),
                                createItem3('otherDeduction', salaryRecord.otherDeduction,'(R)'),
                                createItem3('totalDeduction', salaryRecord.totalDeduction,'(S = K+L+M+N+O+P+Q+R)'),
                            ]
                        }
                    </ListGroup>
                </AccordionBody>
            </AccordionItem>            
            <AccordionItem>
                <AccordionHeader targetId="5">Net Salary</AccordionHeader>
                <AccordionBody accordionId="5">
                    <ListGroup flush>
                    {
                            [

                                createItem3('Net wages paid', salaryRecord.netwagespaid,'(Total Income - Total Deductions)'),
                                createItem('Mode of Payment', salaryRecord.modeOfPayment),
                                createItem('Date of Payment', salaryRecord.dateofPayment)
                            ]
                        }
                    </ListGroup>
                </AccordionBody>
            </AccordionItem>               
        </Accordion>
    </div>
    )
    )

}

export default SalaryPreviewPanel;