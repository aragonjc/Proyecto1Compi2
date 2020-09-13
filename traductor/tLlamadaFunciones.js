class tLlamadaFunciones {

    constructor(id ,str) {
        this.id = id;
        this.str = str;
    }

    translate(scope) {
        return this.id + "();"
    }

}

module.exports = tLlamadaFunciones;