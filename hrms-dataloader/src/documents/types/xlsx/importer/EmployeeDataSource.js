class EmployeeDataSource {

    constructor( relativepath , sheetName ) {
        this.relativepath = relativepath;
        this.sheetName = sheetName;
    }

    getRelativepath() {
        return this.relativepath;
    }

    getSheetName() {
        return this.sheetName;
    }

}

module.exports = EmployeeDataSource