const GenericMasterModel = require('../schema/masters/GenericMasterSchema');

const saveMaster = async ( id , masterType , valuesJson ) => {
    console.log('Inside saveMaster');
    if(!masterType || !valuesJson) return ;
    console.log('Inside saveMaster id ',id);
    if(!id) {
        const genericMasterModel = new GenericMasterModel();
        genericMasterModel['masterType'] = masterType;
        genericMasterModel['values'] = valuesJson;
        const newModel = await genericMasterModel.save();
        console.log('Inside new model ',newModel);
        return newModel;
    }
    const query = await GenericMasterModel.findByIdAndUpdate(id,{masterType,values:valuesJson});
    console.log('Updated model ',query);
    return query;
}

const fetchMaster = async (masterType) => { 
    if(!masterType) return ;
    const masterRecord = await GenericMasterModel.findOne({masterType}).lean();
    console.log(masterRecord);
    return masterRecord;
} 

module.exports = {
    saveMaster,
    fetchMaster
}
