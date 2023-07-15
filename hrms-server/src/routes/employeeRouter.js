const express = require('express')
const router = express.Router()
const dbconnectorMiddleware = require('../middleware/dbconnector.js');

router.post('/save', dbconnectorMiddleware , async (req, res, next) => {
  const employeeReq = req.body;
  const collection = req['mongodb'].collection("employees");
  const result = await collection.insertOne(employeeReq);
  res.send(`A document was inserted with the _id: ${result.insertedId}`);
})

module.exports = router;