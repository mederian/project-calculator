const displayView = document.querySelector('.display');
const numericButtons = document.querySelectorAll(".numeric");
const operatorButtons = document.querySelectorAll(".operator")
const specialButtons = document.querySelectorAll(".special");
const displayData = {
    firstNum: 0,
    hasNum: false, //if firstNum is a result of previous operation
    operator: "none",
    secondNum: NaN,
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

window.addEventListener('keydown', (e) => {
    //if e is a number 0 - 9, create div with class numeric
    
    const button = document.querySelector(`[data-id="${e.value}"]`);
    
    //buttonListener();
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

    const display = isNaN(second) ? first: second;

    displayView.innerText =  display;    
}

function numericInput(e){

    //TODO: Make it impossible to have more than one decimal sign in a number

    if(!displayData.hasNum || displayData.operator == "none"){
        if(displayData.firstNum == 0) displayData.firstNum = e.target.dataset.value; 
        else displayData.firstNum += e.target.dataset.value;  
        displayData.hasNum = true;  
    }
    else{
        if(isNaN(displayData.secondNum)) displayData.secondNum = e.target.dataset.value; 
        else displayData.secondNum += e.target.dataset.value;         
    }
}

function operatorInput(e){
    if(displayData.hasNum){
        console.log("hasnum");
        if(e.target.dataset.value == "="){
            if(displayData.operator != "none"){
                displayData.firstNum = operation(displayData.firstNum, displayData.secondNum, displayData.operator);
                displayData.secondNum = NaN;
                displayData.operator = "none";
            }
        }
        else{
            console.log("else" + displayData.secondNum);
            //If second number is already set, then do = and add selected operator as the next operator..

            if(isNaN(displayData.secondNum)){
                displayData.operator = e.target.dataset.value;
            }            
            else{
                if(displayData.operator != "none"){
                    displayData.firstNum = operation(displayData.firstNum, displayData.secondNum, displayData.operator);
                    displayData.secondNum = NaN;
                    displayData.operator = e.target.dataset.value;
                } 
            }
                
        }
        hasNum = true; //
    }
}
function specialInput(e){
    if(e.target.dataset.value == "ac"){
        displayData.firstNum = 0;
        displayData.secondNum = NaN;
        displayData.operator = "none";
        displayData.hasNum = false;
    }
    else if(e.target.dataset.value == "%"){

    }
    else if(e.target.dataset.value == "plusminus"){
        if(displayData.operator == "none"){
            //change pos/neg on first
            displayData.firstNum = toggePosNegNumber(displayData.firstNum);
        }
        else if(displayData.operator != "none"){
            //change pos/neg of second
            displayData.secondNum = toggePosNegNumber(displayData.secondNum);
        }
    }
}

function toggePosNegNumber(num){
    const val = Number(num);
    
    if(val > 0){
        return -Math.abs(val);
    }
    else if(val < 0){
        return Math.abs(val);
    }
    else return 0;

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