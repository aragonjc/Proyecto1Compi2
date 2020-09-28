class EscapeExp {

    constructor(type,exp) {
        this.type = type;
        this.exp = exp;
    }

    run(scope,consoleT) {

        if(this.type == 'BREAK') {
            return {type:'BREAK'}
        } else if(this.type == 'CONTINUE') {
            return {type:'CONTINUE'}
        } else if(this.type == "RETURN"){
            //console.log(this.exp)
            if(this.exp != null) {

                var res = this.exp.run(scope,consoleT);
                return {type:"RETURN",res:res}
            }
            return {type:"RETURN"}
        }
    }

}
module.exports = EscapeExp;