const Nodo = require('./Nodo.js');
class typeList extends Nodo{

    constructor(line,column,list) {
        super(line,column,null)
        this.list = list;
        this.contador = 1;
    }

    run(scope) {

        if(this.list != null) {
            return this.list.run(scope) + this.contador;
        }

        return this.contador;
    }
}

module.exports = typeList;