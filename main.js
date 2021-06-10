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
const numbersKeys = [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    zero,
];

const decimal = document.querySelector("#decimal");

const addition = document.querySelector("#addition");
const subtraction = document.querySelector("#subtraction");
const multiplication = document.querySelector("#multiply");
const division = document.querySelector("#divide");
const arithmeticKeys = [addition, subtraction, multiplication, division];

const openingBracket = document.querySelector("#opening-bracket");
const closingBracket = document.querySelector("#closing-bracket");
const brackets = [openingBracket, closingBracket];

const equalsTo = document.querySelector("#equalsto");
const del = document.querySelector("#delete");
const allClear = document.querySelector("#allclear");

const cursor = document.querySelector("#cursor");

const expression = document.querySelector("#expression");
let evaluation = document.querySelector("#evaluation");
var operators = {};
var operands = {};
var allExpressions = "";
var refinedExpression = "";
var expressionInsideBracket = "";

numbersKeys.forEach((key) => {
    key.addEventListener("click", () => {
        const number = key.textContent;
        expression.removeChild(cursor);
        expression.textContent += number;
        expression.appendChild(cursor);
    });
});

decimal.addEventListener("click", () => {
    expression.removeChild(cursor);
    expression.textContent += ".";
    expression.appendChild(cursor);
});

arithmeticKeys.forEach((key) => {
    key.addEventListener("click", () => {
        const operator = key.textContent;
        expression.removeChild(cursor);
        expression.textContent += operator;
        expression.appendChild(cursor);
    });
});

brackets.forEach((bracket) => {
    bracket.addEventListener("click", () => {
        const Bracket = bracket.textContent;
        expression.removeChild(cursor);
        expression.textContent += Bracket;
        expression.appendChild(cursor);
    });
});

del.addEventListener("click", () => {
    expression.removeChild(cursor);
    expression.textContent = expression.textContent.slice(0, -1);
    expression.appendChild(cursor);
});

allClear.addEventListener("click", () => {
    expression.textContent = "";
    expression.appendChild(cursor);
    allExpressions = "";
    operands = {};
    operators = {};
    evaluation.textContent = "";
});

equalsTo.addEventListener("click", () => {
    if ([...expression.children].includes(cursor)) {
        expression.removeChild(cursor);
    }
    allExpressions = expression.textContent.trim();
    if (allExpressions.length) {
        const isValid = verify(allExpressions);
        if (isValid) {
            console.log("the expression is valid");
            console.log(refinedExpression);
            let exp = refinedExpression;
            while (checkForBrackets(exp)) {
                let index = exp.indexOf(expressionInsideBracket);
                if (
                    exp.length >
                    exp.indexOf(expressionInsideBracket) +
                        expressionInsideBracket.length
                ) {
                    exp = exp.replace(
                        `(${expressionInsideBracket})`,
                        evaluate(expressionInsideBracket)
                    );
                } else {
                    exp = exp.replace(
                        `(${expressionInsideBracket}`,
                        evaluate(expressionInsideBracket)
                    );
                }
            }
            let result = evaluate(exp);
            console.log("result", result);
            evaluation.textContent = result;
        } else {
            console.log("the expression is not valid");
            evaluation.textContent = "Syntax Error";
        }
    }
});

const verify = (exp) => {
    let isValid = true;
    let isComplete = false;
    let openingBracketCount = 0;
    let closingBracketCount = 0;
    let refinedExp = exp.charAt(0);
    let previousCharacter = exp.charAt(0);
    if (refinedExp == ".") {
        refinedExp = "0.";
    } else if (refinedExp == ")") {
        isValid = false;
        isComplete = true;
    } else if (refinedExp == "(") {
        openingBracketCount++;
    }
    if (exp.length == 1) {
        if (isNaN(exp)) {
            isValid = false;
        }
    } else {
        while (true) {
            if (isComplete) {
                break;
            }
            for (let i = 1; i < exp.length; i++) {
                let currentCharacter = exp.charAt(i);
                if (i == exp.length - 1) {
                    if (isNaN(currentCharacter)) {
                        if (currentCharacter == ")") {
                            closingBracketCount++;
                            if (closingBracketCount > openingBracketCount) {
                                isValid = false;
                                isComplete = true;
                            } else {
                                if (
                                    !isNaN(previousCharacter) ||
                                    previousCharacter == ")"
                                ) {
                                    refinedExp += currentCharacter;
                                    isComplete = true;
                                } else {
                                    isValid = false;
                                    isComplete = true;
                                }
                            }
                        } else {
                            isValid = false;
                            isComplete = true;
                        }
                    } else {
                        refinedExp += currentCharacter;
                        isComplete = true;
                    }
                } else {
                    if (isNaN(currentCharacter)) {
                        if (isNaN(previousCharacter)) {
                            if (currentCharacter == ".") {
                                if (previousCharacter == ".") {
                                    isValid = false;
                                    isComplete = true;
                                    break;
                                } else {
                                    if (previousCharacter == ")") {
                                        refinedExp += `x0${currentCharacter}`;
                                        previousCharacter = currentCharacter;
                                    } else {
                                        refinedExp += `0${currentCharacter}`;
                                        previousCharacter = currentCharacter;
                                    }
                                }
                            } else if (currentCharacter == "(") {
                                openingBracketCount++;
                                if (previousCharacter == ".") {
                                    isValid = false;
                                    isComplete = true;
                                    break;
                                } else {
                                    if (previousCharacter == ")") {
                                        refinedExp += `x${currentCharacter}`;
                                        previousCharacter = currentCharacter;
                                    } else {
                                        refinedExp += currentCharacter;
                                        previousCharacter = currentCharacter;
                                    }
                                }
                            } else if (currentCharacter == ")") {
                                closingBracketCount++;
                                if (closingBracketCount > openingBracketCount) {
                                    isValid = false;
                                    isComplete = true;
                                    break;
                                } else {
                                    if (previousCharacter == ")") {
                                        refinedExp += currentCharacter;
                                        previousCharacter = currentCharacter;
                                    } else {
                                        isValid = false;
                                        isComplete = true;
                                        break;
                                    }
                                }
                            } else if (
                                currentCharacter == "/" ||
                                currentCharacter == "x"
                            ) {
                                if (previousCharacter == ")") {
                                    refinedExp += currentCharacter;
                                    previousCharacter = currentCharacter;
                                } else {
                                    isValid = false;
                                    isComplete = true;
                                    break;
                                }
                            } else if (currentCharacter == "+") {
                                if (previousCharacter == ".") {
                                    isValid = false;
                                    isComplete = true;
                                    break;
                                } else if (previousCharacter == ")") {
                                    refinedExp += currentCharacter;
                                    previousCharacter = currentCharacter;
                                }
                            } else {
                                if (previousCharacter == ".") {
                                    isValid = false;
                                    isComplete = true;
                                    break;
                                } else {
                                    if (
                                        previousCharacter == "/" ||
                                        previousCharacter == "x" ||
                                        previousCharacter == "(" ||
                                        previousCharacter == ")"
                                    ) {
                                        refinedExp += currentCharacter;
                                        previousCharacter = currentCharacter;
                                    } else if (previousCharacter == "+") {
                                        refinedExp =
                                            refinedExp.slice(0, -1) +
                                            currentCharacter;
                                        previousCharacter = currentCharacter;
                                    } else {
                                        refinedExp =
                                            refinedExp.slice(0, -1) + "+";
                                        previousCharacter = "+";
                                    }
                                }
                            }
                        } else {
                            if (currentCharacter == "(") {
                                openingBracketCount++;
                                refinedExp += `x${currentCharacter}`;
                                previousCharacter = currentCharacter;
                            } else if (currentCharacter == ")") {
                                closingBracketCount++;
                                if (closingBracketCount > openingBracketCount) {
                                    isValid = false;
                                    isComplete = true;
                                    break;
                                } else {
                                    refinedExp += currentCharacter;
                                    previousCharacter = currentCharacter;
                                }
                            } else {
                                refinedExp += currentCharacter;
                                previousCharacter = currentCharacter;
                            }
                        }
                    } else {
                        if (previousCharacter == ")") {
                            refinedExp += `x${currentCharacter}`;
                            previousCharacter = currentCharacter;
                        } else {
                            refinedExp += currentCharacter;
                            previousCharacter = currentCharacter;
                        }
                    }
                }
            }
        }
    }
    console.log(openingBracketCount, closingBracketCount);
    if (isValid) {
        refinedExpression = refinedExp;
        return true;
    } else {
        return false;
    }
};

const checkForBrackets = (exp) => {
    let startIndex;
    let endIndex;
    for (let i = 0; i < exp.length; i++) {
        if (exp.charAt(i) == "(") {
            startIndex = i;
        } else if (exp.charAt(i) == ")") {
            endIndex = i;
            break;
        }
    }
    if (!isNaN(startIndex)) {
        if (!isNaN(endIndex)) {
            expressionInsideBracket = exp.slice(startIndex + 1, endIndex);
        } else {
            expressionInsideBracket = exp.slice(startIndex + 1);
        }
        return true;
    } else {
        return false;
    }
};

const evaluate = (Expression) => {
    if (countOperators(Expression)) {
        while (countOperators(Expression, "/")) {
            console.log("division");
            setOperands(Expression, Expression.indexOf("/"));
            Expression = Expression.replace(
                `${operands.first}/${operands.second}`,
                operate("/")
            );
        }
        while (countOperators(Expression, "x")) {
            console.log("multiplication");
            setOperands(Expression, Expression.indexOf("x"));
            console.log(operands.first);
            console.log(operands.second);
            Expression = Expression.replace(
                `${operands.first}x${operands.second}`,
                operate("x")
            );
        }
        Expression = sumUp(Expression);
    }
    return Expression;
};

const countOperators = (exp, operator = "all") => {
    if (operator == "all") {
        operators.division = countOperators(exp, "/");
        operators.multiplication = countOperators(exp, "x");
        operators.addition = countOperators(exp, "+");
        operators.subtraction = countOperators(exp, "-");
        operators.total =
            operators.division +
            operators.multiplication +
            operators.addition +
            operators.subtraction;
        return operators.total;
    } else {
        let count = 0;
        [...exp].forEach((character) => {
            if (character == operator) {
                count++;
            }
        });
        return count;
    }
};

const setOperands = (exp, operatorPosition) => {
    let index = operatorPosition;
    let count = 1;
    let firstOperand = 0;
    let secondOperand = 0;
    let j = 1;
    while (true) {
        if (isNaN(exp[index - count])) {
            if (exp[index - count] == ".") {
                firstOperand /= j;
                j = 1;
                count++;
                continue;
            } else if (exp[index - count] == "-") {
                if (isNaN(exp[index - count - 1])) {
                    firstOperand = -firstOperand;
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        firstOperand = Number(exp[index - count]) * j + firstOperand;
        j *= 10;
        count++;
    }
    j = 10;
    count = 1;
    let flag = false;
    let negative = false;
    while (true) {
        if (isNaN(exp[index + count])) {
            if (count == 1 && exp[index + count] == "-") {
                negative = true;
                count++;
                continue;
            } else {
                if (exp[index + count] == ".") {
                    flag = true;
                    j = 10;
                    count++;
                    continue;
                } else {
                    break;
                }
            }
        }
        if (flag) {
            secondOperand += exp[index + count] / j;
            j *= 10;
        } else {
            secondOperand = secondOperand * j + Number(exp[index + count]);
        }
        count++;
    }
    if (negative) {
        secondOperand = -secondOperand;
    }
    operands.first = Number(Math.round(firstOperand + "e10") + "e-10");
    operands.second = Number(Math.round(secondOperand + "e10") + "e-10");
};

const operate = (op) => {
    let firstOperand = operands.first;
    let secondOperand = operands.second;
    let result = 0;
    if (op == "/") {
        result = Number(
            Math.round(firstOperand / secondOperand + "e10") + "e-10"
        );
    } else if (op == "x") {
        result = Number(
            Math.round(firstOperand * secondOperand + "e10") + "e-10"
        );
    }
    return result;
};

const sumUp = (exp) => {
    let sum = 0;
    let number = 0;
    let isNegative = false;
    let j = 0;
    let flag = false;
    if (countOperators(exp)) {
        if (countOperators(exp) == 1) {
            if (isNaN(exp.charAt(0))) {
                return Number(Math.round(Number(exp) + "e10") + "e-10");
            }
        }
        for (let i = 0; i < exp.length; i++) {
            if (isNaN(exp.charAt(i)) && exp.charAt(i) != ".") {
                if (isNegative) {
                    sum = Number(Math.round(sum - number + "e10") + "e-10");
                } else {
                    sum = Number(Math.round(sum + number + "e10") + "e-10");
                }
                number = 0;
                if (exp.charAt(i) == "-") {
                    isNegative = true;
                    flag = false;
                    continue;
                } else {
                    isNegative = false;
                    flag = false;
                    continue;
                }
            } else {
                if (flag) {
                    number = Number(
                        Math.round(number + Number(exp.charAt(i)) / j + "e10") +
                            "e-10"
                    );
                    j *= 10;
                } else {
                    if (exp.charAt(i) == ".") {
                        j = 10;
                        flag = true;
                        continue;
                    }
                    number = Number(
                        Math.round(
                            number * 10 + Number(exp.charAt(i)) + "e10"
                        ) + "e-10"
                    );
                }
            }
        }
        if (isNegative) {
            sum = Number(Math.round(sum - number + "e10") + "e-10");
        } else {
            sum = Number(Math.round(sum + number + "e10") + "e-10");
        }
    } else {
        sum = Number(Math.round(Number(exp) + "e10") + "e-10");
    }
    return sum;
};

var blink = setInterval(handleBlink, 500);

function handleBlink() {
    if (cursor.classList.contains("active")) {
        cursor.classList.remove("active");
        cursor.classList.add("inactive");
    } else {
        cursor.classList.remove("inactive");
        cursor.classList.add("active");
    }
}
