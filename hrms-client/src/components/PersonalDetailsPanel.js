import React, { useState } from 'react';
import {
    Row, Col
} from 'reactstrap';
import MyTextField from './common/html/MyTextField';
import MySelectField from './common/html/MySelectField';

const PersonalDetailsPanel = () => {
    return (
        <Row>
            <Col xs="3">
                <MyTextField
                    label="Guardian Name"
                    name="guardian"
                    type="text"
                    placeholder=""
                />
            </Col>
            <Col xs="3">
                <MySelectField label="Gender" name="gender">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </MySelectField>
            </Col>
            <Col xs="3">
                <MyTextField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    id="dateOfBirth"
                    placeholder=""
                />
            </Col>
            <Col xs="3">
                <MySelectField label="Marital Status" name="maritalStatus">
                    <option value="">Select a Status</option>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                </MySelectField>
            </Col>
        </Row>
    );
}

export default PersonalDetailsPanel;