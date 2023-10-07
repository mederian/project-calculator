const displayView = document.querySelector('.display');
const numericButtons = document.querySelectorAll(".numeric");
const operatorButtons = document.querySelectorAll(".operator")
const specialButtons = document.querySelectorAll(".special");
const displayData = {
    firstNum: 0,
    hasNum: false, //if firstNum is a result of previous operation
    operator: "none",
    secondNum: 0,
}


operatorButtons.forEach(button =>{
    button.addEventListener('click', buttonListener);
})

numericButtons.forEach(element => {
    element.addEventListener('click', buttonListener);
});
specialButtons.forEach(element => {
    element.addEventListener('click', buttonListener);
});

function buttonListener(e){
    if(e.target.classList.contains("operator")){
        operatorInput(e);
    }
    else if(e.target.classList.contains("numeric")){
        numericInput(e);
    }
    else if(e.target.classList.contains("special")){
        specialInput(e);
    }

    //TODO: Change so that only one number shows
    const first = displayData.firstNum;
    const op = displayData.operator;
    const second = displayData.secondNum;

    displayView.innerText =  `${first} ${op} ${second}`;    
}

function numericInput(e){
    if(!displayData.hasNum || displayData.operator == "none"){
        if(displayData.firstNum == 0) displayData.firstNum = e.target.dataset.value; 
        else displayData.firstNum += e.target.dataset.value;  
        displayData.hasNum = true;  
    }
    else{
        if(displayData.secondNum == 0) displayData.secondNum = e.target.dataset.value; 
        else displayData.secondNum += e.target.dataset.value;         
    }
}

function operatorInput(e){
    if(displayData.hasNum){
        if(e.target.dataset.value == "="){
            if(displayData.operator != "none"){
                displayData.firstNum = operation(displayData.firstNum, displayData.secondNum, displayData.operator);
                displayData.secondNum = 0;    
            }
        }
        else{
            console.log("operator");
            displayData.operator = e.target.dataset.value;    
        }
    }
}
function specialInput(e){
    if(e.target.dataset.value == "ac"){
        displayData.firstNum = 0;
        displayData.secondNum = 0;
        displayData.operator = "none";
        displayData.hasNum = false;
    }
    else if(e.target.dataset.value == "%"){

    }
    else if(e.target.dataset.value == "plusminus"){

    }
}

function add(a,b){
    return Number(a)+Number(b);
}
function sub(a,b){
    return Number(a)-Number(b);
}

function multiply(a,b){
    return Number(a)*Number(b);
}

function divide(a,b){
    return Number(a)/Number(b);
}

function operation(a, b, op){
    if(op == "+") return add(a,b);
    if(op == "-") return sub(a,b);
    if(op == "*") return multiply(a,b);
    if(op == "/") return divide(a,b);
}