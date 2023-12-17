import React, { useState } from 'react';
import {
    ListGroup, ListGroupItem
} from 'reactstrap';
import MyTextArea from './common/html/MyTextArea';
import MyTextField from './common/html/MyTextField';

const NomineeDetailsPanel = () => {
    return (
        <ListGroup>
            <ListGroupItem>
                <MyTextField
                    label="epfNominee"
                    name="epfNominee"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="epfNomineeRelation"
                    name="epfNomineeRelation"
                    type="text"
                    placeholder=""
                />
            </ListGroupItem>
            <ListGroupItem>
                <MyTextField
                    label="esiNominee"
                    name="esiNominee"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="esiNomineeRelation"
                    name="esiNomineeRelation"
                    type="text"
                    placeholder=""
                />
            </ListGroupItem>
            <ListGroupItem>
                <MyTextField
                    label="gpaIPNominee"
                    name="gpaIPNominee"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="gpaIPNomineeRelation"
                    name="gpaIPNomineeRelation"
                    type="text"
                    placeholder=""
                />
            </ListGroupItem>
            <ListGroupItem>

                <MyTextField
                    label="gratuityNominee"
                    name="gratuityNominee"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="gratuityNomineeRelation"
                    name="gratuityNomineeRelation"
                    type="text"
                    placeholder=""
                />

            </ListGroupItem>
        </ListGroup>
    );
}

export default NomineeDetailsPanel;