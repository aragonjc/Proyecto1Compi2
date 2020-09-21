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
            } else if (valIzq.type === "STRING" && valDer.type === "BOOLEAN") {
                let res = valIzq.value + valDer.value
                let resTObject =  new TObject(0,0,res,"STRING");
                return resTObject;
            } else if (valIzq.type === "BOOLEAN" && valDer.type === "STRING") {
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
        } else if (this.operator == ">") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            
            let res = opIzqVal > opDerVal;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == "<") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            
            let res = opIzqVal < opDerVal;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == ">=") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            
            let res = opIzqVal >= opDerVal;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == "<=") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            
            let res = opIzqVal <= opDerVal;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == "==") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            let res = (opIzqVal == opDerVal);
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
            
        } else if (this.operator == "!=") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            let res = (opIzqVal != opDerVal);
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        } else if (this.operator == "&&") {

            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            let res = (opIzqVal && opDerVal);
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        } else if (this.operator == "||") {
            
            let opIzqVal = this.convertedValue(valIzq);
            let opDerVal = this.convertedValue(valDer);
            let res = (opIzqVal || opDerVal);
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        } else if (this.operator == "!") {
            
            let opIzqVal = this.convertedValue(valIzq);
            let res = !opIzqVal;
            
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        } else if (this.operator == "INC") {

            let opIzqVal = this.convertedValue(valIzq);
            let res = opIzqVal+1;
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;

        } else if (this.operator == "DEC") {
            let opIzqVal = this.convertedValue(valIzq);
            let res = opIzqVal-1;
            
            let resTObject =  new TObject(0,0,res,String(typeof(res)).toUpperCase());
            return resTObject;
        }
    }

}

Operation.prototype.convertedValue = function(value) {
    
    if (value.type == "NUMBER") {
        return Number(value.value);
    } else if (value.type == "STRING") {
        return String(value.value);
    } else if (value.type == "BOOLEAN") {
        if(typeof(value.value) == "string") {
            if(value.value == "true")
                return true;
            else
                return false;
        }
        return Boolean(value.value);
    } else if(value.type == "NULL") {
        return null;
    }
    return undefined;
}

module.exports = Operation;
