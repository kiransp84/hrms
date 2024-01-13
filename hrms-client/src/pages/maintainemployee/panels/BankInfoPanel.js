import React, { useState } from 'react';
import {
    Row, Col
} from 'reactstrap';

import MyTextField from '../../../components/common/html/MyTextField';

const BankInfoPanel = () => {
    return (
		<>
			<Row className="detailspanel">
				<Col xs="4">
					<MyTextField
						label="Bank Name"
						name="bankName"
						type="text"
						placeholder=""
					/>
				</Col>			
			</Row>
			<Row className="detailspanel">
				<Col xs="4">
					<MyTextField
						label="IFSC Code"
						name="ifscCode"
						type="text"
						placeholder=""
					/>
				</Col>
			</Row>		
			<Row className="detailspanel">
				<Col xs="6">
					<MyTextField
						label="Account Number"
						name="accountNumber"
						type="number"
						placeholder=""
					/>
				</Col>	
			</Row>						
		</>
    );
}

export default BankInfoPanel;