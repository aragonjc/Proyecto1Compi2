class tAsignVariables {

    constructor(id,exp ,str) {
        this.id = id;
        this.exp = exp;
        this.str = str;
    }

    translate(scope,cond,sTable,funcId) {
        if(funcId != null) {
            let aa = sTable.filter(element => {
                if(element.parentId == funcId) {
                    return element;
                }
            });
            
            if(aa.length > 0) {
                var b = aa.filter(element => {
                    if(element.id == this.id) {
                        return element;
                    }
                });

                if(b.length > 0) {
                    scope.insertVariableGlobally(funcId+"__"+this.id,"let","");
                    var a = "";
                    if(this.exp != null) {
                        a = this.exp.translate(scope,cond,sTable,funcId);
                    }
                    return this.id + "=" + a;
                }
            }
        } else {
            var a = "";
            if(this.exp != null) {
                a = this.exp.translate(scope,cond,sTable,funcId);
            }
            if(a != "") {
                a = " = " + a;
            }
            scope.insertVariable(this.id,"let",a);
        }
        var a;
        if(this.exp != null) {
            a = this.exp.translate(scope,cond,sTable,funcId);
        }
        return "let " + this.id + "=" + a;
    }

}

module.exports = tAsignVariables;