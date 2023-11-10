require('./environment')();

const {initConnection,disconnectConnection} = require('./database/init');

///////////
const app = require('express')();
app.use(require('body-parser').urlencoded({ extended: false }));
require('./routes')(app); 

// database connnectivity 
initConnection();

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  console.log('Shutting down the server Closing all db connections');
  await disconnectConnection();
  console.log('Shut Down Complete');
  process.exit(0);
});

app.listen( process.env.PORT , async () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  console.log(`To test the front end hit the webpack server using url http://localhost:3001/ `);
});