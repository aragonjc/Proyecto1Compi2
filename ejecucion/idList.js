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

    get(scope) {
        console.log("hola")
        if(this.isArray) {

            let exp = this.expOrID.run(scope);
            
            if(exp.type != "NULL") {
                
                var aux = null;

                if(this.auxp != null) {
                    aux = this.auxp.get(scope);
                    let r = [];
                    r.push({isArray:true,exp:exp,id:null });
                    aux.forEach(element => {
                        r.push(element);
                    });
                    return r;
                }
                return [{isArray:true,exp:exp,id:null }]

            } else {
                //ERROR
            }
            
        } else {
            var aux = null;
            if(this.auxp != null) {
                aux = this.auxp.get(scope);
                let r = [];
                r.push({isArray:false,exp:null,id:this.expOrID });
                aux.forEach(element => {
                    r.push(element);
                });
                return r;
            }
            return [{isArray:false,exp:null,id:this.expOrID }]
        }
    }
}   

module.exports = idList;