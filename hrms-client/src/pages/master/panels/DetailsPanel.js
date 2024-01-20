import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'reactstrap';
import AddPanel from '../panels/AddPanel';

export default ({ masterType, afterSaveFn }) => {
    const [result, setResult] = useState({});

    useEffect(() => {
        async function fetchData() {
            if (!masterType) return null;
            return axios({
                method: 'get',
                url: `/bff/masters/fetch?masterType=${masterType}`,
                responseType: 'json'
            })
            .then(function (response) {
                console.log(' Got list from server ', response.data);
                setResult(response.data.results);
                return response;
            });
        }
        fetchData();
    }, [masterType]);

    return (<Container fluid>
        <Table>
            <thead>
                <tr>
                    <th>
                        Label
                    </th>
                    <th>
                        Value
                    </th>
                </tr>
            </thead>
            <tbody>
                {

                    result && result.values ? result.values.map(
                        (value, index) => (
                            <tr key={index}>
                                <td>
                                    {value.label}
                                </td>
                                <td>
                                    {value.value}
                                </td>
                            </tr>
                        )
                    ) : null
                }

            </tbody>
        </Table>
        <AddPanel
            result={result}
            masterType={masterType}
            afterSaveFn={afterSaveFn} />
    </Container>
    );
}

