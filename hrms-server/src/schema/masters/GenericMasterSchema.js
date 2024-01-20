const mongoose = require('mongoose');

const  {Schema} = mongoose ;

const genericMasterSchema = new Schema({
    masterType:{
        type: String,
        required: true,
        immutable: true 
    },
    values:{
        type: JSON,
        required: true,
    }      
});

const GenericMasterModel = mongoose.model('genericMaster', genericMasterSchema );
module.exports = GenericMasterModel;



