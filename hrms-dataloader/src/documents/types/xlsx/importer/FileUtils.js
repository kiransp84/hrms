const fs = require('fs');
const path = require('path');
const Configuration = require('./Configuration');
const { open, close } = require('node:fs/promises');

const readFile = async (relativePath) => {
    const filePath = path.resolve( Configuration.getBasePath() ,relativePath);
    //console.log(`IMPORT_DEBUG:  filePath `,filePath);
    const fd = await open(filePath, 'r');
    //console.log('IMPORT_DEBUG: fd ',fd );
    const file = await fd.readFile();
    //console.log('IMPORT_DEBUG: file ',file );
    return file;
}

module.exports = {
    readFile
}