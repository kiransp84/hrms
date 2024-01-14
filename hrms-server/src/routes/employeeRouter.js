const express = require('express')
const router = express.Router()
const {Error}= require('mongoose');
const Employees = require('../schema/employee/EmployeeSchema');
const EmployeesModel = require('../schema/employee/EmployeeSchema');

const assign = require('lodash.assign');


const copyPasteAttributes = (source={},destination) => {
    destination = assign(destination,source);  
}

const handleError = (err,res) => {
  console.error(' Got error ');
  if( err instanceof Error.ValidationError)
      console.error(' Validation Error : In Fields ',Object.keys(err.errors));
  else 
      console.error(' Error Info  ',err);
  res.send({
    statusCode:'NOK',
    results:null,
    error:err
  });  
}

router.post('/save', async (req, res, next) => {
  console.log(' inside save ');
  const lookUp = { employeeCode : req.body.employeeCode };
  const optional = await EmployeesModel.findOne( lookUp ).exec();                    
  try{  
    if( optional ) {
      console.log(' found existing employee hence updating ');
      const employeeDTO =  {};
      copyPasteAttributes(req.body,employeeDTO);
      await EmployeesModel.replaceOne( lookUp , employeeDTO  );
      const updateEmployeeResponse = {
        statusCode:'OK',
        results:[employeeDTO]
      }
      res.send(updateEmployeeResponse);
    }else {
      console.log(' found new employee hence creating ');
      let employeeModel = new Employees();
      copyPasteAttributes(req.body,employeeModel);
      console.log(' Model before saving ',JSON.stringify(employeeModel));
      await employeeModel.save(); 
      const saveEmployeeResponse = {
        statusCode:'OK',
        results:[employeeModel]
      }
      res.send(saveEmployeeResponse);
    }
  }catch(err) {
    handleError(err,res);
    return;
  }
})

router.get('/listEmployees', async (req, res, next) => {  
  const results = await Employees.find().lean();
  const transformedResults = results.map( result => {
    console.log('id -- ',result.id);
    console.log('dateOfBirth -- ',result.dateOfBirth);
    console.log('dateOfBirth in local string -- ',result.dateOfBirth.toLocaleString());
    console.log('dateOfBirthDisplay -- ',result.dateOfBirthDisplay);

    if( result.dateOfBirth ) {    
      const formattedDate = result.dateOfBirth.toISOString().split('T')[0];
      Object.assign(result , { dateOfBirth : formattedDate } );    
    }  
    if( result.dateOfJoining ) {    
      const formattedDate = result.dateOfJoining.toISOString().split('T')[0];
      Object.assign(result , { dateOfJoining : formattedDate } );    
    }
    if( result.lastWorkingDate ) {    
      const formattedDate = result.lastWorkingDate.toISOString().split('T')[0];
      Object.assign(result , { lastWorkingDate : formattedDate } );    
    }
    if( result.dateOfReleaving ) {    
      const formattedDate = result.dateOfReleaving.toISOString().split('T')[0];
      Object.assign(result , { dateOfReleaving : formattedDate } );    
    }

    return result;
  

  });
  console.log(' transformedResults ',transformedResults);

  const listEmployeeResponse = {
    statusCode:"OK",
    results:transformedResults
  };
  res.send(listEmployeeResponse);
})

const handleResponse = (result,res) => {

  console.log('result ',result)
  
  
  const transformedResponse = {};
  copyPasteAttributes(result,transformedResponse);
  if( transformedResponse.dateOfBirth ) {    
    const formattedDate = transformedResponse.dateOfBirth.toISOString().split('T')[0];
    Object.assign(transformedResponse , { dateOfBirth : formattedDate } );    
  }  
  if( transformedResponse.dateOfJoining ) {    
    const formattedDate = transformedResponse.dateOfJoining.toISOString().split('T')[0];
    Object.assign(transformedResponse , { dateOfJoining : formattedDate } );    
  }
  if( transformedResponse.lastWorkingDate ) {    
    const formattedDate = transformedResponse.lastWorkingDate.toISOString().split('T')[0];
    Object.assign(transformedResponse , { lastWorkingDate : formattedDate } );    
  }
  if( transformedResponse.dateOfReleaving ) {    
    const formattedDate = transformedResponse.dateOfReleaving.toISOString().split('T')[0];
    Object.assign(transformedResponse , { dateOfReleaving : formattedDate } );    
  }

  console.log(' transformedResponse ',transformedResponse);
  const listEmployeeResponse = {
    statusCode:"OK",
    results:[transformedResponse]
  };

  
  res.send(listEmployeeResponse);   
}

router.get('/findOne', async(req,res) => {
  if( !req.query.id ) {
    res.send(null); 
    return;
  }
  const result = await Employees.findById(req.query.id).lean();

  console.log(result);
  /*.transform( res => {
    if( res == null )
    return res;
    if( res.dateOfBirth ) 
    Object.assign(res , { dateOfBirth : res.dateOfBirth.toLocaleString().split(" ")[0] } );    
  });*/

  handleResponse(result,res)
});




module.exports = router;