const numbers = document.querySelector(".numbersdiv");
const buttonValues = [7, 8, 9, "/", 4, 5, 6, "*",
                1, 2, 3, "-", ".", 0, "=", "+"];
let k = 0;
let operator = "";


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
    switch (button.textContent) {
        case "+":
        case "-": 
        case "*":
        case "/":
            console.log("working");
            break;
        case "=":
            console.log("working again");
            break;
        default: 
            console.log("it is working againn!");
            break;
    }
}