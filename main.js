const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const zero = document.querySelector("#zero");
const numbersKeys = [one, two, three, four, five, six, seven, eight, nine, zero]; 

const addition = document.querySelector("#addition");
const subtraction = document.querySelector("#subtraction");
const multiplication = document.querySelector("#multiply");
const division = document.querySelector("#divide");
const arithmeticKeys = [addition, subtraction, multiplication, division];
const equalsTo = document.querySelector("#equalsto");
const del = document.querySelector("#delete");

const cursor = document.querySelector("#cursor");


const expression = document.querySelector("#expression");
let evaluation = document.querySelector("#evaluation");
evaluation.textContent = "";
var temp = "";
var numbers = [];

numbersKeys.forEach((key) => {
    key.addEventListener('click', () => {
        const number = key.textContent;
        temp += number;
        expression.removeChild(cursor);
        expression.textContent += number;
        expression.appendChild(cursor);
    });
});

arithmeticKeys.forEach((key) =>{
    key.addEventListener('click',()=>{
        if(temp.length>0){
           const number = Number(temp);
           numbers.push(number);
           temp = "";
        }
        const operator = key.textContent;
        operators.push(operator);
        expression.removeChild(cursor);
        expression.textContent += operator;
        expression.appendChild(cursor);
    });
});

equalsTo.addEventListener('click',()=>{
    if(temp.length>0){
        const number = Number(temp);
        numbers.push(number);
        temp = "";
     }
     expression.removeChild(cursor);
    var allExpressions = expression.textContent.trim();
    console.log(allExpressions);

    if(operators.includes("/")){
        let operatorCount =0;
        operators.forEach(operator => {
            if (operator == "/"){
                operatorCount++;
            }
            
        });
        while (operatorCount != 0){
            
            let index = allExpressions.indexOf("/");
            let count = 1;
            console.log(index);
            let firstNumber = 0;
            let secondNumber = 0;
            let j = 1;
            while(Number(allExpressions[index-count])){
                firstNumber = allExpressions[index-count]*j + firstNumber;
                j *= 10;
                count++;
    
            }
            console.log(firstNumber);
            j = 1;
            count = 1;
            while(Number(allExpressions[index+count])){
                secondNumber =  secondNumber + allExpressions[index+count]*j ;
                j *= 10;
                count++;
    
            }
            console.log(secondNumber);
            console.log(operators.count("/"));

            let result = firstNumber / secondNumber;
            console.log(result);
        }
    }

    //  operators.forEach((operator)=>{
    //      const first = numbers.shift();
    //      const second = numbers.shift();
    //      switch (operator) {
    //          case "+":
    //              numbers. unshift(first+second);
    //              break;
    //          default:
    //              break;
    //      }
    //  });
    //  console.log(numbers[0]);
    //  evaluation.textContent = numbers[0];
    // console.log(numbers);
    // console.log(operators);
    // console.log(evaluation.textContent);
});

var blink = setInterval(handleBlink, 500);

function handleBlink(){
    if (cursor.classList.contains("active")){
        cursor.classList.remove("active");
        cursor.classList.add("inactive");
    }else{
        cursor.classList.remove("inactive");
        cursor.classList.add("active");
    }
}