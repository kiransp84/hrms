import React, { useState } from 'react';
import {
    Row, Col
} from 'reactstrap';
import MyTextField from '../../../components/common/html/MyTextField';
import MySelectField from '../../../components/common/html/MySelectField';

const EmploymentDetailsPanel = () => {
    return (
        <>
            <Row className="detailspanel">
                <Col xs="4">
                    <MySelectField label="Designation" name="designation">
                        <option value="">Select a Designation</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Tester">Tester</option>
                    </MySelectField>
                </Col>

                <Col xs="4">
                    <MyTextField
                        label="Date of Joining"
                        name="dateOfJoining"
                        type="date"
                        id="dateOfJoining"
                        placeholder=""
                    />
                </Col>

                <Col xs="4">
                    <MySelectField label="Status" name="status">
                        <option value="">Select a Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                    </MySelectField>
                </Col>

            </Row>
            <Row>
                <Col xs="4">
                    <MyTextField
                        label="Last Working Date"
                        name="lastWorkingDate"
                        type="date"
                        placeholder=""
                    />
                </Col>
                <Col xs="4">
                    <MyTextField
                        label="Date Of Releaving"
                        name="dateOfReleaving"
                        type="date"
                        placeholder=""
                    />
                </Col>
                <Col xs="4">
                    <MyTextField
                        label="Remarks"
                        name="remarks"
                        type="text"
                        placeholder=""
                    />
                </Col>
            </Row>
        </>
    );
}

export default EmploymentDetailsPanel;