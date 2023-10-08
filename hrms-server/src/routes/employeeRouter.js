const express = require('express')
const router = express.Router()
const Employees = require('../schema/employee/EmployeeSchema');

router.post('/save', async (req, res, next) => {
  const employeeReq = req.body;
  const employeeModel = new Employees();
  employeeModel.employeeCode = 'A-8260';
  await employeeModel.save(); 
  res.send(`A document was inserted with the _id: ${employeeModel._id}`);
})

router.get('/listEmployees', async (req, res, next) => {
  const results = await Employees.find();
  results.map( result => {
    console.log('dateOfBirth -- ',result.dateOfBirth);
    console.log('dateOfBirth in local string -- ',result.dateOfBirth.toLocaleString());
  })
  console.log(' results ',results );
  res.send(`OK`);
})



module.exports = router;