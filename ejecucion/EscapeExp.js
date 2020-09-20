class EscapeExp {

    constructor(type,exp) {
        this.type = type;
        this.exp = exp;
    }

    run(scope) {

        if(this.type == 'BREAK') {
            return {type:'BREAK'}
        } else if(this.type == 'CONTINUE') {
            return {type:'CONTINUE'}
        } else {

        }
    }

}
module.exports = EscapeExp;