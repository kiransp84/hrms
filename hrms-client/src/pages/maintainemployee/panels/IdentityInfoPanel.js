import React, { useState } from 'react';
import {
    Row, Col
} from 'reactstrap';

import MyTextField from '../../../components/common/html/MyTextField';

const IdentityInfoPanel = () => {
    return (
        <Row>
            <Col xs="12">
                <MyTextField
                    label="PAN"
                    name="pan"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="aadhaar"
                    name="aadhaar"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="uan"
                    name="uan"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="epfNumber"
                    name="epfNumber"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="esiNumber"
                    name="esiNumber"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="welfareFundNumber"
                    name="welfareFundNumber"
                    type="text"
                    placeholder=""
                />
            </Col>
        </Row>
    );
}

export default IdentityInfoPanel;