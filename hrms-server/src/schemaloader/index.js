require('../environment')();

const {getConnection,getDB,closeConnection} = require('../database/connect');
const {Int32} = require("bson");

const isCollectionExistsError = (e) => {
    return e && e.code && e.codeName && e.code === 48 && e.codeName === 'NamespaceExists'
}

(async () => {

    // connect to the schema 
    const client = await getConnection();
    //DEBUG
    //console.log(' connection is ',client );

    //find a DB 
    const db = await getDB(client);
    //console.log(' db is ',db );

    // create a collection
    let collection = null;
    
    
    try {
        await db.createCollection("students", {
            validator: {
               $jsonSchema: {
                  bsonType: "object",
                  title: "Student Object Validation",
                  required: [ "address", "major", "name", "year" ],
                  properties: {
                     name: {
                        bsonType: "string",
                        description: "'name' must be a string and is required"
                     },
                     year: {
                        bsonType: "int",
                        minimum: 2017,
                        maximum: 3017,
                        description: "'year' must be an integer in [ 2017, 3017 ] and is required"
                     },
                     gpa: {
                        bsonType: [ "double" ],
                        description: "'gpa' must be a double if the field exists"
                     }
                  }
               }
            }
         } )
    }catch( e ) {
        if( !isCollectionExistsError(e ) ) {
            // checked error throwing 
            throw e;
        }else {
            collection = db.collection("students");
        }
    }
   

    // insert one test record which is valid 

    // insert one test record which is invalid 
    await collection.insertOne( {
        name: "Alice",
        year: new Int32( 2019 ),
        major: "History",
        gpa: new Int32(3),
        address: {
           city: "NYC",
           street: "33rd Street"
        }
     } );

    // should throw an error or just print in console and proceed based on user preference 

    // should query the record just to see if dataload is successful 

    // close the connection 
    closeConnection(client);

})();
