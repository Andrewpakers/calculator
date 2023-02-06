let firstOperand = "";
let secondOperand = "";
let operator = "";
let firstNumberMode = 1;

function init () {
    const btns = document.querySelectorAll('.displayButton');
    btns.forEach((btn) => {
        console.log(btn.id);
        btn.addEventListener('click', () => {
            btn.style.cssText = 'filter: brightness(120%)';
            buttonClick(btn.id);
            setTimeout(() => {btn.style.cssText = 'filter: brightness(100%)'}, 200);
        })
    })
}

function buttonClick (btnID) {
    const viewport = document.querySelector('.viewport');
    if (viewport.textContent.length == 6 && Number(btnID) >= 0 && Number(btnID) < 10 && firstNumberMode != 2) {
        return;
    }
    if (Number(btnID) >= 0 && Number(btnID) < 10) {
        if (firstNumberMode === 1) {
            viewport.textContent += btnID;
            firstOperand = firstOperand + btnID;
            console.log("firstOperand " + firstOperand);
        } else if (firstNumberMode === 2) {
            viewport.textContent = btnID;
            secondOperand = btnID;
            console.log("secondOperand " + secondOperand);
            firstNumberMode = 3;
        } else {
            viewport.textContent += btnID;
            secondOperand = secondOperand + btnID;
            console.log("secondOperand " + secondOperand);
            firstNumberMode = 3;
        }
    } else {
        switch (btnID) {
            case 'AC':
                clear();
                break;
            case 'negative':
                viewport.textContent = (Number(viewport.textContent)*-1);
                break;
            case 'percent':
                viewport.textContent = (Number(viewport.textContent)/100);
                break;
            case 'divide':
                if (firstNumberMode === 1) {
                    firstNumberMode = 2;
                } else {
                    firstNumberMode = 3;
                    calc();
                }
                operator = 'divide';
                break;
            case 'multiply':
                if (firstNumberMode === 1) {
                    firstNumberMode = 2;
                } else {
                    firstNumberMode = 3;
                    calc();
                }
                operator = 'multiply';
                break;
            case 'subtract':
                if (firstNumberMode === 1) {
                    firstNumberMode = 2;
                } else {
                    firstNumberMode = 3;
                    calc();
                }
                operator = 'subtract';
                break;
            case 'add':
                if (firstNumberMode === 1) {
                    firstNumberMode = 2;
                } else {
                    firstNumberMode = 3;
                    calc();
                }
                operator = 'add';
                break;
            case 'equals':
                if (secondOperand === ""){
                    break;
                }
                firstNumberMode = 2;
                calc();
                break;
            case 'decimal':
                if (viewport.textContent.includes(".")){
                    break;
                }
                if (firstNumberMode == 1) {
                    firstOperand = "0." + firstOperand;
                    viewport.textContent = firstOperand;
                } else {
                    secondOperand = "0." + secondOperand;
                    viewport.textContent = secondOperand;
                }
                break;
        }
    }
    
}
function clear () {
    firstOperand = "";
    secondOperand = "";
    firstNumberMode = 1;
    let viewport = document.querySelector('.viewport');
    viewport.textContent = "";
}
function calcOutput(num) {
    let viewport = document.querySelector('.viewport');
    if (num > 999999) {
        alert("Error: numbers cannot be bigger than 999999");
        clear();
        return;
    }
    if (num.toString().length >= 6){
        let str = num.toString();
        str = str.slice(0,6);
        num = Number(str);
    }
    firstOperand = num.toString();
    secondOperand = "";
    if (firstNumberMode === 3) {
        firstNumberMode = 2;
    } else {
        firstNumberMode = 1;
    }
    viewport.textContent = num.toString();
}
function error () {
    alert("You can't divide by 0");
    clear();
}
function calc(){
    let num1 = Number(firstOperand);
    let num2 = Number(secondOperand);
    switch (operator) {
        case 'divide':
            if (num2 == 0){
                error();
                break;
            }
            calcOutput(num1 / num2);
            break;
        case 'multiply':
            calcOutput(num1 * num2);
            break;
        case 'subtract':
            calcOutput(num1 - num2);
            break;
        case 'add':
            calcOutput(num1 + num2);
            break;
    }
}
document.addEventListener('keydown', (event) => {
    const name = event.key;
    const code = event.code;
    if (Number(name) >= 0 && Number(name) < 10){
        buttonClick(name);
    } else {
        switch (name) {
            case '%':
                buttonClick('percent');
                break;
            case '\/':
                buttonClick('divide');
                break;
            case '*':
                buttonClick('multiply');
                break;
            case '-':
                buttonClick('subtract');
                break;
            case '+':
                buttonClick('add');
                break;
            case '.':
                buttonClick('decimal');
                break;
            case '=':
                buttonClick('equals');
                break;
            case 'Enter':
                buttonClick('equals');
                break;
            case 'Backspace':
                buttonClick('AC');
                break;
        }
    }
    console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
  }, false);
init();