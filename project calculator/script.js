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
    else if(e.target.classList.contains("numeric")){
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
    else if(e.target.classList.contains("special")){
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


    const first = displayData.firstNum;
    const op = displayData.operator;
    const second = displayData.secondNum;

    displayView.innerText =  `${first} ${op} ${second}`;    
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

function addnumber(number){
    if(displayData.operator == 'undefined'){
        //add digit to firstNum
    }
    else{
        //add digit to secondNum
    }
}
function addOperator(op){
    if(displayData.operator != 'undefined') return;
    else{
        displayData.operator = op;
    }
}

function updateDisplay(displayData){
    displayView.innerText = (`${displayData.firstNum} ${displayData.operator} ${displayData.secondNum}`);
}

//value and operators
let aVal = 0;  //The first number on the display
let bVal = 0;  //The second number in the display
                // result becomes the first number
                // if typing a number after gotten an result, erase result with typed number
                //
let operator = "add";

function addNumberToDisplay(num){

}



function operation(a, b, op){
    if(op == "+") return add(a,b);
    if(op == "-") return sub(a,b);
    if(op == "*") return multiply(a,b);
    if(op == "/") return divide(a,b);
}