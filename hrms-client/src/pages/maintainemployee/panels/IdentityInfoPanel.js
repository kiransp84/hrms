import React, { useState } from 'react';
import {
    Row, Col
} from 'reactstrap';

import MyTextField from '../../../components/common/html/MyTextField';

const IdentityInfoPanel = () => {
    return (
		<>
        <Row className="detailspanel">
            <Col xs="12">
                <MyTextField
                    label="PAN"
                    name="pan"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="Aadhaar"
                    name="aadhaar"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="UAN"
                    name="uan"
                    type="text"
                    placeholder=""
                />

            </Col>
        </Row>
		<Row className="detailspanel">
			<Col xs="12">
                <MyTextField
                    label="EPFNumber"
                    name="epfNumber"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="ESINumber"
                    name="esiNumber"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="WelfareFundNumber"
                    name="welfareFundNumber"
                    type="text"
                    placeholder=""
                />
			</Col>
		</Row>
		</>
    );
}

export default IdentityInfoPanel;