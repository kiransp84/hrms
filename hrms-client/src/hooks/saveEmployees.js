import axios from 'axios';



export const saveEmployees = (formData) => {
    console.log(' formData to send to server ',formData);
    return axios({
        method: 'post',
        url: '/bff/employees/save',  
        responseType: 'json',
        data:formData
      })
        .then(function (response) {
            console.log(' Got response from server ',response.data );
            if( response.data && response.data.statusCode === 'OK'){
                console.log(' Got OK from server ' );
            }
            return response;
      });
}