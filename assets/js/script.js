//Wait for DOM to finish before running the game
//Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function(){
    //catch all buttons
    let buttons = document.getElementsByTagName('button');
    //iterate through them
    for( let button of buttons) {
        button.addEventListener("click", function(){
            if(this.getAttribute('data-type') === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key ==="Enter") {
            checkAnswer();
        }
    })
    runGame("addition")
    runGame("subtract")
    runGame("multiply")
})

/**  The main game "loop", called when the script is first loaded
  * and after the use answer has been processed 
    */
function runGame(gameType) {
    //put cursor in the box and remove previous answer
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    //create two random numbers
    let num1 = Math.trunc(Math.random() * 25) + 1;
    let num2 = Math.trunc(Math.random() * 25) + 1;
    if(gameType === "addition") {
        displayAdditionQuestion(num1, num2)
    } 
    else if(gameType === "subtract") {
        displaySubtractQuestion(num1, num2)
    }
     else if(gameType === "multiply") {
        displayMultiplyQuestion(num1, num2)
    }
    
    else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting`;
    }
}
/** compare correct answer with user answer */
function checkAnswer() {
 let userAnswer = parseInt(document.getElementById("answer-box").value);
 let calculatedAnswer = calculateCorrectAnswer();
 let isCorrect = userAnswer === calculatedAnswer[0]
  if(isCorrect) {
    incrementScore()
  } else {
    alert(`${calculatedAnswer[0]} was right answer, better luck next time`)
    incrementWrongAnswer()
  }
  runGame(calculatedAnswer[1])

}
/**gets operands(numbers) and the operators
 * directly from the dom and returns correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").textContent;
    if(operator === "+") {
        return [operand1 + operand2, "addition"]
    } 
    else if (operator === "-") {
        return [operand1 - operand2, "subtract"]
    } 
    else if (operator === "x") {
        return [operand1 * operand2, "multiply"]
    } 
    else {
        alert(`unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}. Aborting!`;
    };
    
};
/** gets current score from DOM and increments it by 1 */
function incrementScore(){
 let oldScore = parseInt(document.getElementById('score').innerText);
 document.getElementById('score').innerText = oldScore + 1;
}
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
 document.getElementById('incorrect').innerText = oldScore + 1;

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}
function displaySubtractQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}
function displayMultiplyQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}