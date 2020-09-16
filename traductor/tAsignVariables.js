class tAsignVariables {

    constructor(id,exp, decVar, defVarLast,str) {
        this.id = id;
        this.exp = exp;
        this.decVar = decVar;
        this.defVarLast = defVarLast;
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
                    scope.insertVariableGlobally(funcId+"__"+this.id,this.decVar,"");
                    var a = "";
                    if(this.exp != null) {
                        a = this.exp.translate(scope,cond,sTable,funcId);
                    }

                    var defL = "";
                    if(this.defVarLast != null) {
                        defL = this.defVarLast.translate(scope,cond,sTable,funcId);
                        defL = defL.substr(2);
                        defL = this.decVar +" " + defL;
                    }

                    return funcId+"__"+this.id + "" + a +this.str + "\n"  + defL;
                }
            }
        } /*else {
            var a = "";
            if(this.exp != null) {
                a = this.exp.translate(scope,cond,sTable,funcId);
            }
            if(a != "") {
                a = "" + a;
            }
            scope.insertVariable(this.id,this.decVar,a);
        }*/

        var a = "";
        if(this.exp != null) {
            a = this.exp.translate(scope,cond,sTable,funcId);
        }
        scope.insertVariable(this.id,this.decVar,a);
        var def = "";
        if(this.defVarLast != null) {
            def = this.defVarLast.translate(scope,cond,sTable,funcId);
        }

        return this.decVar + " " + this.id + a + def +this.str;
    }

}

module.exports = tAsignVariables;