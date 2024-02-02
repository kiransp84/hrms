require('./environment')();

const {initConnection,disconnectConnection} = require('./database/init');

///////////
const app = require('express')();
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());
app.use(require('cors')());
require('./routes')(app); 

// database connnectivity 
initConnection();

(
  ()=>{
    const filePath = require('path').resolve( process.cwd() , 'temp','reports');
    const fs = require('fs');    
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath,{recursive:true});
      }
    } catch (err) {
      console.error(err);
    }
  }
)();

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