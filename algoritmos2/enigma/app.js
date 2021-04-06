//Enigma

//Constants
const plainAlphabet = "abcdefghijklmnopqrstuvwxyz:()!¡,'";
const encryptedAlphabet = "qw,ert(yuio'pa:sdfg!hjklz¡xcv)bnm";

//Main function
var main = () => {
    //Add listeners to buttons
    manageListeners();
    //Initialize textareas
    var originalText = document.getElementById("original-text").value = "";
    var encryptedText = document.getElementById("encrypted-text").value = "";
}

var manageListeners = () => {
    var encryptButton = document.getElementById("encrypt-button");
    var decryptButton = document.getElementById("decrypt-button");
    encryptButton.addEventListener("click",encryptDecryptText);
    decryptButton.addEventListener("click",encryptDecryptText);
}

var encryptDecryptText = (event) => {
    var originalTextarea = document.getElementById("original-text");
    var encryptedTextarea = document.getElementById("encrypted-text");
    var auxIndex = 0;
    var targetText = new String;
    var originText, targetTextArea, originAlphabet, targetAlphabet;
    //Get from event if it has to encrypt or decrypt the text
    var action = event.target.id.substring(0, event.target.id.indexOf("-"));
    //Set the variables depending on the action (encrypt/decrypt)
    if (action === "encrypt") {
        originText = originalTextarea.value;
        originAlphabet = plainAlphabet;
        targetAlphabet = encryptedAlphabet;
        targetTextArea = encryptedTextarea;
    } else {
        originText = encryptedTextarea.value;
        originAlphabet = encryptedAlphabet;
        targetAlphabet = plainAlphabet;
        targetTextArea = originalTextarea;
    }
    //Process the origin text accordingly
    for(var i=0; i<originText.length; i++){
        auxIndex = originAlphabet.indexOf(originText[i]);
        if (auxIndex > -1) {
            targetText += targetAlphabet[auxIndex]; 
        } else {
            targetText += originText[i];
        }
    }
    targetTextArea.value = targetText;
}

//Main function call
main();