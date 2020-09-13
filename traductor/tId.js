class tId {

    constructor(id,property,str){
        this.id = id;
        this.property = property;
        this.str = str;
    }

    translate(scope) {
        
        
        return this.id;

    }
}

module.exports = tId;