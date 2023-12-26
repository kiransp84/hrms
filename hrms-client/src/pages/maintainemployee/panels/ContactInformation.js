import React, { useState } from 'react';
import {
    Row, Col
} from 'reactstrap';
import MyTextArea from '../../../components/common/html/MyTextArea';
import MyTextField from '../../../components/common/html/MyTextField';

const ContactInformation = () => {
    return (
        <Row>
            <Col xs="6">
                <MyTextField
                    label="Contact Number"
                    name="contactNumber"
                    type="number"
                    placeholder=""
                />

                <MyTextArea
                    label="Address"
                    name="address"
                    id="address"
                    placeholder=""
                    rows="4"
                    cols="50"
                />
            </Col>
        </Row>
    );
}

export default ContactInformation;