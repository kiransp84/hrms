const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

module.exports = () => {
    ////    
    const myEnv = dotenv.config();
    dotenvExpand.expand(myEnv);
    console.log(' SERVER ENVIRONMENT : ',process.env);
    ////
}