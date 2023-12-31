// setup routes 
const employeeRouter = require('./employeeRouter.js');
const payrollRouter = require('./payrollRouter');

const BASE_PATH = "/bff";

module.exports = (app) => {
	
	// health check 
	app.get('/', (req, res) => {
	  res.send('PING')
	});

	app.use(`${BASE_PATH}/employees` , employeeRouter );
	app.use(`${BASE_PATH}/payrollmaster` , payrollRouter );
	
}