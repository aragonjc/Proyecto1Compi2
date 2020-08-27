class Error {
    constructor(line,column,type,errorType) {
        this.line = line;
        this.column = column;
        this.type = type;
        this.errorType = errorType; 
    }
}
module.exports = Error;