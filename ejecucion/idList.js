class idList {

    constructor(isArray,expOrID,auxp) {
        this.isArray = isArray;
        this.expOrID = expOrID;
        this.auxp = auxp;
    }

    run(scope) {

        var aux = null;

        if(this.auxp != null) {
            aux = this.auxp.run(scope);
        }

        if(this.isArray) {

            let exp = this.expOrID.run(scope);

        } else {

            return {id:this.expOrID,auxP:aux}
            
        }
    }
}   

module.exports = idList;