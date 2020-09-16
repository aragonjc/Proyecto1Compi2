class tId {

    constructor(id,property,str){
        this.id = id;
        this.property = property;
        this.str = str;
    }

    translate(scope,cond,sTable,funcId) {
        
        
        if(cond != null) {
            if(!scope.existVariable(this.id)) {
                if(sTable != null) {
                    sTable.push({parentId:cond,id:this.id});
                    return cond + "__" + this.id;
                }
                if(funcId != null) {
                    return funcId + "__"+this.id;
                }
            }
            //scope.varUse.push({funcParent:cond,prop:this.id});
            //console.log(scope);
        }

        if(!scope.existVariable(this.id)) {
            
            if(funcId != null) {
                return funcId + "__"+this.id;
            }
        }
        return this.id;

    }
}

module.exports = tId;