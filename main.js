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
const decimal = document.querySelector("#decimal");
const cursor = document.querySelector("#cursor");


const expression = document.querySelector("#expression");
let evaluation = document.querySelector("#evaluation");
evaluation.textContent = "";
var temp = "";
var numbers = [];
var operators = [];
var result;
var allExpressions;

numbersKeys.forEach((key) => {
    key.addEventListener('click', () => {
        const number = key.textContent;
        temp += number;
        expression.removeChild(cursor);
        expression.textContent += number;
        expression.appendChild(cursor);
    });
});

decimal.addEventListener('click',() =>{
    temp += ".";
    expression.removeChild(cursor);
    expression.textContent += ".";
    expression.appendChild(cursor);
});

del.addEventListener('click',()=>{
    if(temp.length){
        temp = temp.slice(0,-1);
    }else{
        operators.pop();
    }
    expression.removeChild(cursor);
    expression.textContent = expression.textContent.slice(0,-1);
    expression.appendChild(cursor);
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
    allExpressions = expression.textContent.trim();
    console.log(allExpressions);

    while(operators.length){
        if(operators.includes("/")){
            operate("/");
        }else if(operators.includes("x")){
            operate("x");
    
        }else if(operators.includes("+")){
            operate("+");
        }else{
            operate("-");
        }
    }
evaluation.textContent = allExpressions;

});

const operate = (op)=>{
    let operatorCount =0;
    operators.forEach(operator => {
        if (operator == op){
            operatorCount++;
        }
        
    });
    while (operatorCount != 0){
        
        let index = allExpressions.indexOf(op);
        let count = 1;
        console.log(index);
        let firstNumber = 0;
        let secondNumber = 0;
        let j = 1;
        let flag = false;
        while(!isNaN(allExpressions[index-count])|| allExpressions[index-count] =="."){
            if (allExpressions[index-count] =="."){
                firstNumber = firstNumber/j;
                j = 1;
                count ++;
                continue;
            }
            
            firstNumber = Number(allExpressions[index-count])*j + firstNumber ;
            j *= 10;
            count++;

        }
        console.log("firstNumber", firstNumber, typeof(firstNumber));
        count = 1;
        while(!isNaN(allExpressions[index+count]) || allExpressions[index+count] == "."){
            if (allExpressions[index+count] == "."){
                flag = true;
                count++;
                j = 10;
                continue;
            }
            if (flag) {
                secondNumber = secondNumber + Number(allExpressions[index+count])/j;
                j *=10;
            }else{

                secondNumber =  secondNumber*10 + Number(allExpressions[index+count]);
            }
            count++;

        }
        console.log("secondNumber", secondNumber,typeof(secondNumber));
        let exp = firstNumber + op + secondNumber;
        if(op == "/"){

            result = firstNumber / secondNumber;
        }else if(op == "x"){
            result = firstNumber * secondNumber;
        }else if( op == "+"){
            result = firstNumber + secondNumber;
        }else{
            result = firstNumber - secondNumber;
        }

        allExpressions = allExpressions.replace(exp, result);
        operators.splice(operators.indexOf(op), 1);
        
        console.log(result);
        operatorCount--;
        console.log("all", allExpressions);
        console.log("operators", operators);
    }
}

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