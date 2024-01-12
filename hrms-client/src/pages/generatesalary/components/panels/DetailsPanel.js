import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import FilterPanel from './FilterPanel';
import InputPanel from './InputPanel';

import SalaryPreviewContainer from '../containers/SalaryPreviewContainer';

const DetailsPanel = ({fetchSalaryCallFn,estimateSalaryFn,saveSalaryFn}) => {
    const currentMonth = new Date().getMonth(); 
    const currentYear = new Date().getFullYear();
    return (
        <Container>
            <Row>
                <Col className="bg-light border">
                    <FilterPanel currentMonth={currentMonth} currentYear={currentYear} onList={fetchSalaryCallFn} /> 
                </Col>
            </Row>
            <Row>
                <Col className="bg-light border">
                    <InputPanel onCalculate={estimateSalaryFn} onSave={saveSalaryFn} />
                </Col>
            </Row>
            <Row>
                <Col className="bg-light border">
                    <SalaryPreviewContainer />
                </Col>
            </Row>            
        </Container>
    );
}

export default DetailsPanel;