// setup routes 
const employeeRouter = require('./employeeRouter.js');
const payrollRouter = require('./payrollRouter');
const salaryRouter = require('./salaryRouter');
const masterRouter = require('./masterRouter');
const reportsController = require('./reportsController');

const BASE_PATH = "/bff";

module.exports = (app) => {
	
	// health check 
	app.get('/', (req, res) => {
	  res.send('PING')
	});

	app.use(`${BASE_PATH}/employees` , employeeRouter );
	app.use(`${BASE_PATH}/payrollmaster` , payrollRouter );
	app.use(`${BASE_PATH}/salary` , salaryRouter );
	app.use(`${BASE_PATH}/masters` , masterRouter );
	app.use(`${BASE_PATH}/reports` , reportsController );
	


	
}