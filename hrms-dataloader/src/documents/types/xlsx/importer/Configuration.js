class Configuration {
    
    constructor() {
        this.initialize();
    }

    initialize() {
        this.setBasePath();
    }

    setBasePath() {
        if( !process.env.basePath) {
            throw new Error("File Utils inilization failed as basePath is not set ");
        }
        this.basePath = process.env.basePath;
        console.log('IMPORT_DEBUG: setBasePath to ',this.basePath);            
    }

    getBasePath() {
        console.log('IMPORT_DEBUG: return getBasePath as ',this.basePath);            
        return this.basePath;
    }

};

module.exports = new Configuration()