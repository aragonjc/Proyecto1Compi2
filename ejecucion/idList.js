class idList {

    constructor(isArray,expOrID,auxp) {
        this.isArray = isArray;
        this.expOrID = expOrID;
        this.auxp = auxp;
    }
    //para funciones
    run(scope,console) {

        var aux = null;

        if(this.auxp != null) {
            aux = this.auxp.run(scope,console);
        }

        if(this.isArray) {

            let exp = this.expOrID.run(scope,console);
            

        } else {

            return {id:this.expOrID,auxP:aux}
            
        }
    }

    get(scope,console) {
        if(this.isArray) {

            let exp = this.expOrID.run(scope,console);
            
            if(exp.type != "NULL") {
                
                var aux = null;

                if(this.auxp != null) {
                    aux = this.auxp.get(scope,console);
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
                console.log("Error 1 en idList.js")
            }
            
        } else {
            var aux = null;
            if(this.auxp != null) {
                aux = this.auxp.get(scope,console);
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