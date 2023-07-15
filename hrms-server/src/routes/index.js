// setup routes 
const employeeRouter = require('./employeeRouter.js');

module.exports = (app) => {
	
	// health check 
	app.get('/', (req, res) => {
	  res.send('PING')
	});

	app.use('/employee' , employeeRouter );
	
}