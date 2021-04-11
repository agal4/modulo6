//Calculadora de cambio óptimo de billetes y monedas

const NOTES_COINS = [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

var main = () => {
    document.getElementById("change-button").addEventListener("click", calculateChange);
}

var calculateChange = () => {
    var amountToPay = Number(document.getElementById("total-amount").value);
    var inputAmount = Number(document.getElementById("input-amount").value);
    var totalChange = inputAmount - amountToPay;
    var result;
    var stringChange = "";
    var i = 0;

    if (totalChange > 0) {
        do {
            result = totalChange / NOTES_COINS[i];
            if (Math.trunc(result) > 0) {
                stringChange += String(Math.trunc(result)) + "*" + String(i) + ",";
                totalChange = totalChange - Math.trunc(result)*NOTES_COINS[i];
            }
            i++;
        } while (totalChange>0 && i<NOTES_COINS.length);
        printChange(stringChange.slice(0,-1));
    } else {
        console.log("Error: El importe entregado no es suficiente");
    }
}

var printChange = (stringChange) => {
    var splitElement, elementContent;
    var splitChange = stringChange.split(",");
    var listContainerElement = document.getElementById("result-list");
    var currentListElement;
    if (stringChange != ""){
        splitChange.forEach(element => {
            splitElement = element.split("*");
            if (Number(splitElement[1])<=5) {
                if (Number(splitElement[0])>1) {
                    elementContent = splitElement[0] + " billetes de " + NOTES_COINS[splitElement[1]] + "€";
                } else {
                    elementContent = splitElement[0] + " billete de " + NOTES_COINS[splitElement[1]] + "€";
                }
            } else {
                if (Number(splitElement[0])>1) {
                    elementContent = splitElement[0] + " monedas de " + NOTES_COINS[splitElement[1]] + "€";
                } else {
                    elementContent = splitElement[0] + " moneda de " + NOTES_COINS[splitElement[1]] + "€";
                }
            }
            currentListElement = document.createElement("li");
            currentListElement.innerHTML = elementContent;
            listContainerElement.appendChild(currentListElement);
        });
    }
}

main();