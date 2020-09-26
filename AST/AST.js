
function Node(n,op,left,right){
    let str = "N"+n + "("+op+")";
    if(left != null && left != "") {
        str += "\n";
        str += left.code + "\n";
        str += "N"+n + "-->" + "N" + left.count;
    }
    if(right != null && right != "") {
        str += "\n";
        str += right.code + "\n";
        str += "N"+n + "-->" + "N" + right.count;
    }
    return {code:str,count:n}
}

function Leaf(n,value){
    return {code:"N"+n + "("+value+")",count:n};
}


module.exports = {
    Leaf:Leaf,
    Node:Node
}