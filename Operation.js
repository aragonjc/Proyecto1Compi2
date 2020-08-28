const Nodo = require('./Nodo.js');
const TObject = require('./TObject.js');
class Operation extends Nodo{

    constructor(line,column,opIzq,opDer,operator) {
        super(line,column,null);
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.operator = operator;
    }

    

    run(scope) {
        let valIzq;
        let valDer;
        if(this.opIzq != null)
            valIzq = this.opIzq.run(scope);
        if(this.opDer != null)
            valDer = this.opDer.run(scope);
        if(this.operator == "+") {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) + Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else if (valIzq.type === "NUMBER" && valDer.type === "STRING") {
                let res = String(valIzq.value) + String(valDer.value);
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "STRING" && valDer.type === "NUMBER") {
                let res = valIzq.value + String(valDer.value);
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "STRING" && valDer.type === "STRING") {
                let res = valIzq.value + valDer.value
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "STRING" && valDer.type === "BOOL") {
                let res = valIzq.value + valDer.value
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "BOOL" && valDer.type === "STRING") {
                let res = valIzq.value + valDer.value
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if(this.operator == "-") {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) - Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if(this.operator == '*') {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) * Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if(this.operator == '/') {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) / Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if(this.operator == 'unary') {
            if(valIzq.type === "NUMBER") {
                let res = Number(valIzq.value) * -1;
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if (this.operator == "**") {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Math.pow(Number(valIzq.value),Number(valDer.value));
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        } else if (this.operator == "%") {
            if(valIzq.type === "NUMBER" && valDer.type === "NUMBER") {
                let res = Number(valIzq.value) % Number(valDer.value);
                let resTObject =  new TObject(0,0,res,"NUMBER");
                return resTObject;
            } else {
                console.log("ERROR");
            }
        }
    }

}
module.exports = Operation;
