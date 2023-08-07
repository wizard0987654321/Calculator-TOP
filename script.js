const numbers = document.querySelector(".numbersdiv");
const buttonValues = [7, 8, 9, "/", 4, 5, 6, "x",
                1, 2, 3, "-", ".", 0, "=", "+"];

let k = 0;
let operator = "";
let previousNum = 0;
let currentNum = "";
let resultNum = 0;
let currentOutput = "";
let previousOperator = false;
let operatorCount = 0;
let result = "";

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

function executeOrder(button) {
    const screen = document.querySelector(".screendiv");

    switch (button.textContent) {
        case "+":
        case "-": 
        case "x":
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

            operator = button.textContent;


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
            currentOutput = "";
            screen.textContent = resultNum;
            currentNum = resultNum;
            console.log(resultNum);
            operatorCount = 0;
            break;
        default:
            currentNum += button.textContent.toString();
            
            currentOutput = currentNum;
            screen.textContent = currentOutput;
            
            previousOperator = false;

            console.log(currentNum);
            break;
    }
}


function executeOperation(a, b, c) {
    a = Number(a);
    c = Number(c);

    switch (b) {
        case "-":
            return a - c;
        case "+":
            return a + c;
        case "x":
            return a * c;
        case "/":
            return a / c;
    }
}

