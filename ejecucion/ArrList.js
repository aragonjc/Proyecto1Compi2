class ArrList {

    constructor(arr) {
        this.arr = arr;
    }

    run(scope) {
        if(this.arr != null) {
            var a = this.arr.run(scope);
            return {value:a.arr,type:a.type,isArray:true,dim:1}
        }

        return {value:[],type:"NULL",isArray:true,dim:0}
    }
    
}

module.exports = ArrList;