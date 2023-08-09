/* Creating array of value, that we are going to pass
to calculator buttons, in order to not code everything
manually in html */

const buttonValues = [7, 8, 9, "/", 4, 5, 6, "*",
                1, 2, 3, "-", ".", 0, "=", "+"];

/* Creating global variables, in order to keep track
of first number, second number and operator and 
make sure, that every combination of buttons does
not return the wrong result */

let k = 0;
let operator = "";
let previousNum = 0;
let currentNum = "";
let resultNum = 0;
let currentOutput = "";
let previousOperator = false;
let operatorCount = 0;
let result = "";
let pressedButton = "";

/* Storing two most important html elements into
variables, in order to update their values and 
interface later */

const numbers = document.querySelector(".numbersdiv");
const screen = document.querySelector(".screendiv");

/* Creating the grid of calculator buttons and
passing the click function to all of them */

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        const newButton = document.createElement("div");
        newButton.classList.add("press");
        newButton.textContent = buttonValues[k];
        numbers.appendChild(newButton);

        k++;
        newButton.addEventListener("click", () => {
            executeOrder(newButton);
        });
    }
}

// Addint keyboard events to whole document

document.addEventListener("keydown", keyboardEvent);

/* Calling executeOrder function, but for 
keyboard event. This function is also called 
in "click" function for calculator buttons */

function keyboardEvent(e) {
    if (e.key >= 0 && e.key <= 9) {
        executeOrder(e.key);
    }
    if (e.key == "=" || e.key == "." || e.key == "+" ||
    e.key == "-" || e.key == "*" || e.key == "/") {
        executeOrder(e.key);      
    } else if (e.key == "Escape") {
        clearCalculator();
    }
}


function executeOrder(button) {

    /* Checking, whether this function was called
    by button click or keyboard event. If it was
    called with mouse click, type of argument is
    object, so we have to get text content of the
    argument. If it was called with keyboard event,
    we directly have the string, that we can use for
    calculations */

    if (typeof(button) === "object") {
        pressedButton = button.textContent;
    } else {
        pressedButton = button;
    }
    
    /* Checking, which one was passed as an 
    argument - operator, number or equal sign */

    switch (pressedButton) {
        case "+":
        case "-": 
        case "*":
        case "/":
            if (operatorCount > 0 && previousOperator === false) {
                result = executeOperation(previousNum, operator, currentNum);
                currentNum = result;
                console.log(result);
            }

            if (previousOperator === true) {
                currentOutput = currentOutput.slice(0, -1);
            }

            if (previousOperator === false) {
                previousNum = currentNum;
                currentNum = "";
            }

            operator = pressedButton;


            currentOutput += operator;
            screen.textContent = currentOutput;
            
            if (operatorCount > 0 && previousOperator === false) {
                result += operator;
                screen.textContent = result;
            }

            previousOperator = true;
            operatorCount += 1;

            console.log(operator);
            break;
        case "=":
            resultNum = executeOperation(previousNum, operator, currentNum);
            if (resultNum === undefined) {
                resultNum = "";
            }
            currentOutput = "";
            screen.textContent = resultNum;
            currentNum = resultNum;
            console.log(resultNum);
            operatorCount = 0;
            break;
        default:
            currentNum += pressedButton.toString();
            
            currentOutput = currentNum;
            screen.textContent = currentOutput;
            
            previousOperator = false;

            console.log(currentNum);
            break;
    }
}

/* If either the equal sign, or
operator was clicked for the second time, code is
executing the calculation */

function executeOperation(a, b, c) {
    a = Number(a);
    c = Number(c);

    if (b === "/" && c === 0) {
        return "Error";
    }
    
    switch (b) {
        case "-":
            return a - c;
        case "+":
            return a + c;
        case "*":
            return a * c;
        case "/":
            return a / c;
    }
}

// Reseting all the variables, clearing screen

function clearCalculator() {
    k = 0;
    operator = "";
    previousNum = 0;
    currentNum = "";
    resultNum = 0;
    currentOutput = "";
    previousOperator = false;
    operatorCount = 0;
    result = "";
    pressedButton = "";

    screen.textContent = currentOutput;
}