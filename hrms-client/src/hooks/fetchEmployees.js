import axios from 'axios';
import Immutable from 'immutable'; //ListEmployees component expect a immutable list now 
import {useState,useEffect} from 'react'

/*const mockSingleResponse = Immutable.List([
    {
        "empId":"A-1000",
        "firstName":"Kiran"
    }
]); */

export const useFetchEmployees = () => {
    const [employees,setEmployees] = useState(Immutable.List([]));

    useEffect(()=>{
        axios({
            method: 'get',
            url: '/bff/employees/listEmployees',
            responseType: 'json'
          })
            .then(function (response) {
                console.log(' Got list from server ',response.data );
                if( response.data && response.data.statusCode === 'OK'){
                    setEmployees(Immutable.List(response.data.results));
                }                
                /*const mockResponse = mockSingleResponse;
                console.log(' Showing Mock Response ',mockResponse );
                setEmployees(mockResponse);*/
          });
    },[]);
    console.log('employees useFetchEmployees ',employees);
    return employees;
}