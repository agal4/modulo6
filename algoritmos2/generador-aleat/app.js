//Generador aleatorio

var randomPick = (n, min, max) => {
    var randomNum = 0;
    var result = new Array(n)
    var range = max - min + 1;
    for (var i=0; i<n; i++) {
        //Ensure there are no repeated numbers
        do {
            randomNum = Math.floor(Math.random()*range)+min;
        } while (result.includes(randomNum));
        result[i] = randomNum;
    }
    return result;
}

console.log(randomPick(5,50,100));