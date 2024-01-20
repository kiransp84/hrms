import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input  } from 'reactstrap';
import MySelectField from '../html/MySelectField';
import axios from 'axios';

export default ({ label, name, masterType, noFormik, setterFn }) => {
    const [options, setOptions] = useState([]);

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
                    if (response.data.results.values) {
                        setOptions(response.data.results.values.map(v => v.label));
                    }
                    //setOptions(response.data.results);
                    return response;
                });
        }
        fetchData();
    }, [masterType]);

    return noFormik ? (
        <FormGroup>
            <Label for={name}>
                {label}
            </Label>
            <Input
                label={label}
                name={name}
                type="select"
                onChange={(e) => { setterFn(e.target.value) }} >
                [
                                    {
                    <option value="">{`Select a ${label}`}</option>
                },
          {
                    options.map(anOption => <option value={anOption}>{anOption}</option>)
                }
                ]
                        </Input>

        </FormGroup>
    ) : (
            <MySelectField label={label} name={name}>
                [
          {
                    <option value="">{`Select a ${label}`}</option>
                },
          {
                    options.map(anOption => <option value={anOption}>{anOption}</option>)
                }
                ]
        </MySelectField>
        );
}
