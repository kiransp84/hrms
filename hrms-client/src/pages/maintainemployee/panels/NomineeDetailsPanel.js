import React, { useState } from 'react';
import {
    ListGroup, ListGroupItem
} from 'reactstrap';
import MyTextArea from '../../../components/common/html/MyTextArea';
import MyTextField from '../../../components/common/html/MyTextField';

const NomineeDetailsPanel = () => {
    return (
        <ListGroup>
            <ListGroupItem>
                <MyTextField
                    label="EPFNominee"
                    name="epfNominee"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="EPFNomineeRelation"
                    name="epfNomineeRelation"
                    type="text"
                    placeholder=""
                />
            </ListGroupItem>
            <ListGroupItem>
                <MyTextField
                    label="ESINominee"
                    name="esiNominee"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="ESINomineeRelation"
                    name="esiNomineeRelation"
                    type="text"
                    placeholder=""
                />
            </ListGroupItem>
            <ListGroupItem>
                <MyTextField
                    label="GPAIPNominee"
                    name="gpaIPNominee"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="GPAIPNomineeRelation"
                    name="gpaIPNomineeRelation"
                    type="text"
                    placeholder=""
                />
            </ListGroupItem>
            <ListGroupItem>

                <MyTextField
                    label="GratuityNominee"
                    name="gratuityNominee"
                    type="text"
                    placeholder=""
                />

                <MyTextField
                    label="GratuityNomineeRelation"
                    name="gratuityNomineeRelation"
                    type="text"
                    placeholder=""
                />

            </ListGroupItem>
        </ListGroup>
    );
}

export default NomineeDetailsPanel;