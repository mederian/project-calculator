function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

let aVal = 0;
let bVal = 0;
let operator = "add";

function operator(a, b, op){
    if(op == "add") return add(a,b);
    if(op == "sub") return sub(a,b);
    if(op == "multiply") return multiply(a,b);
    if(op == "divide") return divide(a,b);
}