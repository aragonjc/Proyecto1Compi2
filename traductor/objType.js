class objType {

    constructor(list,point,key) {
        this.list = list;
        this.point = point;
        this.key = key;
    }

    translate(scope,cond,sTable,funcId) {
        var l = this.list.translate(scope,cond,sTable,funcId);
        //var p = this.point.translate(scope,cond,sTable,funcId);
        var k = this.key.translate(scope,cond,sTable,funcId);

        return l + this.point + "\n" + k;
    }
}
module.exports = objType;