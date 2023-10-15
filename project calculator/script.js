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
const operators = ['+', '-', '=', '*', '/'];

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
    keyListener(e);
});

function keyListener(e){
    const stored = e.key;
    if(!isNaN(e.key)){
        if(e.key > -1 && e.key < 10){
            numericInput(e.key);
        }
    }

    console.log(e.key)
    if(e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+" || e.key === "=") operatorInput(e.key);
    if(e.key === "Enter") operatorInput("=");
    if(e.key === "Backspace") specialInput(e.key);
    if(e.key === "Escape") specialInput(e.key);
    if(e.key === ".") numericInput(e.key);
    


    //if special
    updateDisplay();
}

function buttonListener(e){
    console.log(e);
    if(e.target.classList.contains("operator")){
        operatorInput(e.target.dataset.value);
    }
    else if(e.target.classList.contains("numeric")){
        numericInput(e.target.dataset.value);
    }
    else if(e.target.classList.contains("special")){
        specialInput(e.target.dataset.value);
    }
    updateDisplay();    
}

function updateDisplay() {
    const first = displayData.firstNum;
    const second = displayData.secondNum;
    const display = isNaN(second) ? first : second;
    displayView.innerText = display;
}

function numericInput(e){

    //TODO: Make it impossible to have more than one decimal sign in a number
    console.log(e);
    if(!displayData.hasNum || displayData.operator == "none"){
        if(e === "." && displayData.firstNum.includes(e)) return;
        if(displayData.firstNum == 0) displayData.firstNum = e; 
        else displayData.firstNum += e;  
        displayData.hasNum = true;  
    }
    else{
        if(e === "." && displayData.secondNum.includes(e)) return;
        if(isNaN(displayData.secondNum)) displayData.secondNum = e; 
        else displayData.secondNum += e;         
    }
}

function operatorInput(e){
    if(displayData.hasNum){
        console.log("hasnum");
        if(e == "="){
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
                displayData.operator = e;
            }            
            else{
                if(displayData.operator != "none"){
                    displayData.firstNum = operation(displayData.firstNum, displayData.secondNum, displayData.operator);
                    displayData.secondNum = NaN;
                    displayData.operator = e;
                } 
            }
                
        }
        hasNum = true; //
    }
}
function specialInput(e){
    if(e == "ac" || e == "Escape"){
        displayData.firstNum = 0;
        displayData.secondNum = NaN;
        displayData.operator = "none";
        displayData.hasNum = false;
    }
    else if(e == "%"){

    }
    else if(e == "plusminus"){
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