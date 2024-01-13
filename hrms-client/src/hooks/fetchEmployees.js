import axios from 'axios';
import Immutable from 'immutable'; //ListEmployees component expect a immutable list now 
import { useState, useEffect } from 'react'

/*const mockSingleResponse = Immutable.List([
    {
        "empId":"A-1000",
        "firstName":"Kiran"
    }
]); */

export const useFetchEmployees = () => {
    const [employees, setEmployees] = useState(Immutable.List([]));

    useEffect(() => {
        axios({
            method: 'get',
            url: '/bff/employees/listEmployees',
            responseType: 'json'
        })
            .then(function (response) {
                if (response.data && response.data.statusCode === 'OK') {									
                    setEmployees(Immutable.List(response.data.results));
                }
                /*const mockResponse = mockSingleResponse;
                console.log(' Showing Mock Response ',mockResponse );
                setEmployees(mockResponse);*/
            });
    }, []);
    return employees;
}

export const usefindOneEmployee = (id) => {
    if (!id) return;

    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading ]  = useState(true);

    useEffect(() => {
        axios({
            method: 'get',
            url: '/bff/employees/findOne',
            responseType: 'json',
            params: {
                id
            }
        })
            .then(function (response) {
                setLoading(false);
                if (response.data && response.data.statusCode === 'OK'
                    && response.data.results[0]) {
                    setEmployee(response.data.results[0]);
                }else {
                    setError("Unexpected Error Occured while fetching employee record ");
                }
            });
    }, []);    
    return {employee,error,isLoading};
}