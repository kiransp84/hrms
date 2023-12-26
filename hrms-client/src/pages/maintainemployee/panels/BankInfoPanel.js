import React, { useState } from 'react';
import {
    Row, Col
} from 'reactstrap';

import MyTextField from '../../../components/common/html/MyTextField';

const BankInfoPanel = () => {
    return (
        <Row>
            <Col xs="4">
                <MyTextField
                    label="Bank Name"
                    name="bankName"
                    type="text"
                    placeholder=""
                />
            </Col>
            <Col xs="4">
                <MyTextField
                    label="IFSC Code"
                    name="ifscCode"
                    type="email"
                    placeholder=""
                />
            </Col>
            <Col xs="4">
                <MyTextField
                    label="Account Number"
                    name="accountNumber"
                    type="number"
                    placeholder=""
                />
            </Col>
        </Row>
    );
}

export default BankInfoPanel;