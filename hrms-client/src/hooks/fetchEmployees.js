import axios from 'axios';

import {useState,useEffect} from 'react'

export const useFetchEmployees = () => {
    const [employees,setEmployees] = useState([]);

    useEffect(()=>{
        axios({
            method: 'get',
            url: '/bff/employees/listEmployees',
            responseType: 'json'
          })
            .then(function (response) {
                console.log(' Got list from server ',response.data );
              setEmployees(response.data);
          });
    },[]);

    return employees;
}