import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import axios from 'axios';

export default ({ result , masterType , afterSaveFn }) => {
    const [label,setLabel]  = useState(); 
    const [value,setValue] = useState();

    const save=()=>{
        //To-Do validation 
        let data = { masterType }
        if(result) {
            data.id=result._id;
            data.valuesJson = [
                ...result.values,
                {
                    label,
                    value
                }
            ];
        }else {
            data.valuesJson = [
                {
                    label,
                    value
                }
            ];
        }        
        console.log(' data to send ',data);
        axios({
            method: 'post',
            url: `/bff/masters/save`,
            responseType: 'json',
            data
        })
            .then(function (response) {
                console.log(' Got list from server ', response.data);   
                afterSaveFn(response.data.statusCode === 'OK' ? 'Saved Successfully' : 'Saved Failed' );             
            });
    }

    return (
        <Container fluid className="filterpanel">
            <Form>
                <Row>
                    <Col xs="4">
                            <Label for="label">
                                Label
                            </Label>
                            <Input
                                id="label"
                                name="label"
                                type="text"
                                onChange={(e) => { setLabel(e.target.value) }}
                            >
                            </Input>                                       
                    </Col>    
                    <Col xs="4">
                            <Label for="value">
                                Value
                            </Label>
                            <Input
                                id="value"
                                name="value"
                                type="text"
                                onChange={(e) => { setValue(e.target.value) }}
                            >
                            </Input>                                             
                    </Col>  
                    <Col xs="4">
                         <Button type="button" onClick={save}>
                            Add
                        </Button>                                        
                    </Col>                                                     
                </Row>                
            </Form>
        </Container>
    );
}