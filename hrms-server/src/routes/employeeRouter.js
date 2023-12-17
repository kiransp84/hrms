const express = require('express')
const router = express.Router()
const {Error}= require('mongoose');
const Employees = require('../schema/employee/EmployeeSchema');
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
  let employeeModel = new Employees();
  copyPasteAttributes(req.body,employeeModel);
  console.log(' Model before saving ',JSON.stringify(employeeModel));
  try{
    await employeeModel.save(); 
    const saveEmployeeResponse = {
      statusCode:'OK',
      results:[employeeModel]
    }
    res.send(saveEmployeeResponse);
  }catch(err) {
    handleError(err,res);
    return;
  }
})

router.get('/listEmployees', async (req, res, next) => {
  const results = await Employees.find();
  results.map( result => {
    console.log('dateOfBirth -- ',result.dateOfBirth);
    console.log('dateOfBirth in local string -- ',result.dateOfBirth.toLocaleString());
  })
  const listEmployeeResponse = {
    statusCode:"OK",
    results
  };
  res.send(listEmployeeResponse);
})



module.exports = router;