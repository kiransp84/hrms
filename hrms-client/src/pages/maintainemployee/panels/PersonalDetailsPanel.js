import React, { useState } from 'react';
import {
    Row, Col
} from 'reactstrap';
import MyTextField from '../../../components/common/html/MyTextField';
import MySelectField from '../../../components/common/html/MySelectField';

const PersonalDetailsPanel = () => {
    return (
		<>
		
        <Row className="detailspanel">
            <Col xs="6">
                <MyTextField
                    label="Guardian Name"
                    name="guardian"
                    type="text"
                    placeholder=""
                />
            </Col>
            <Col xs="6">
                <MySelectField label="Gender" name="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </MySelectField>
            </Col>
        </Row>
		<Row className="detailspanel">
            <Col xs="6">
                <MyTextField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    id="dateOfBirth"
                    placeholder=""
                />
            </Col>		
		    <Col xs="6">
                <MySelectField label="Marital Status" name="maritalStatus">
                    <option value="">Select a Status</option>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                </MySelectField>
            </Col>
		</Row>
		</>
    );
}

export default PersonalDetailsPanel;