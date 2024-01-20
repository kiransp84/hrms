import React , {useState,useCallback} from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { MASTERTYPES } from '../../../contants';

export default ({fetchDetails,clearDetails}) => {
    const [masterType,setMasterType] = useState(MASTERTYPES.split(',')[0]);

    const showDetails = useCallback(()=>{
        fetchDetails(masterType);
    },[masterType])

    return (
        <Container fluid className="filterpanel">
            <Form>
                <Row>                    
                    <Col xs="2">
                        <FormGroup>
                            <Label for="masterType">
                            Master Type
                            </Label>
                            <Input
                                id="masterType"
                                name="masterType"
                                type="select"
                                onChange={(e) => { setMasterType(e.target.value) }}
                            >
                                {
                                    MASTERTYPES.split(',').map((month) => (<option value={month} >
                                        {month}
                                    </option>)
                                    )
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <Button type="button" onClick={showDetails}>
                            Search
                        </Button>
                        <Button type="button" onClick={clearDetails}>
                            Clear
                        </Button>
                    </Col>
                </Row>
                {
                                    /*<Row>
                                    <Col xs="12">
                                        {
                                            message ? <AlertPanel message={message} /> : null
                                        }
                                    </Col>
                                </Row>*/
                }
            </Form>
        </Container>
    )
}