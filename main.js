class Calculator {
    constructor() {
        this.init();
        this.setEventListeners();
    }

    init() {
        this.shift = document.querySelector("#shift");
        this.onButton = document.querySelector("#on");
        this.setup = document.querySelector("#setup");

        this.openBraces = document.querySelector("#opening-bracket");
        this.closeBraces = document.querySelector("#closing-bracket");

        this.setupChildNodes = [];
        this.one = document.querySelector("#one");
        this.two = document.querySelector("#two");
        this.three = document.querySelector("#three");
        this.four = document.querySelector("#four");
        this.five = document.querySelector("#five");
        this.six = document.querySelector("#six");
        this.seven = document.querySelector("#seven");
        this.eight = document.querySelector("#eight");
        this.nine = document.querySelector("#nine");
        this.zero = document.querySelector("#zero");

        this.numbersKeys = [
            this.one,
            this.two,
            this.three,
            this.four,
            this.five,
            this.six,
            this.seven,
            this.eight,
            this.nine,
            this.zero,
        ];

        this.addition = document.querySelector("#addition");
        this.subtraction = document.querySelector("#subtraction");
        this.multiplication = document.querySelector("#multiply");
        this.division = document.querySelector("#divide");
        this.arithmeticKeys = [
            this.addition,
            this.subtraction,
            this.multiplication,
            this.division,
        ];
        this.equalsTo = document.querySelector("#equalsto");
        this.del = document.querySelector("#delete");
        this.decimal = document.querySelector("#decimal");
        this.cursor = document.querySelector("#cursor");
        this.allclear = document.querySelector("#allclear");

        this.expression = document.querySelector("#expression");
        this.evaluation = document.querySelector("#evaluation");
        this.evaluation.textContent = "";
        this.temp = "";
        this.numbers = [];
        this.operators = [];
        this.result;
        this.allExpressions;
        this.setupStates = { shift: false, on: true };

        this.blink = setInterval(this.handleBlink, 500);
    }

    setEventListeners() {
        this.onButton.addEventListener("click", () => {
            this.setupStates.on = true;
            this.expression.appendChild(this.cursor);
            this.setupChildNodes.forEach((child) =>
                this.setup.appendChild(child)
            );
        });

        this.shift.addEventListener("click", () => {
            if (!this.isCalculatorOn()) return;

            const shiftSetup = this.setup.querySelector(".shift");
            if (shiftSetup.classList.contains("inactive")) {
                shiftSetup.classList.remove("inactive");
                shiftSetup.classList.add("active");
                this.setupStates.shift = true;
            } else {
                shiftSetup.classList.remove("active");
                shiftSetup.classList.add("inactive");
                this.setupStates.shift = false;
            }
        });

        this.openBraces.addEventListener("click", () => {
            if (!this.isCalculatorOn()) return;

            const operator = this.openBraces.textContent;
            console.log("operator =" + operator);
            this.operators.push(operator);
            this.expression.removeChild(this.cursor);
            this.expression.textContent += "(";
            this.expression.appendChild(this.cursor);
        });

        this.closeBraces.addEventListener("click", () => {
            if (!this.isCalculatorOn()) return;

            this.expression.removeChild(this.cursor);
            this.expression.textContent += ")";
            this.expression.appendChild(this.cursor);
        });

        this.numbersKeys.forEach((key) => {
            key.addEventListener("click", () => {
                if (!this.isCalculatorOn()) return;

                const number = key.textContent;
                this.temp += number;
                this.expression.removeChild(this.cursor);
                this.expression.textContent += number;
                this.expression.appendChild(this.cursor);
            });
        });

        this.decimal.addEventListener("click", () => {
            if (!this.isCalculatorOn()) return;

            this.temp += ".";
            this.expression.removeChild(this.cursor);
            this.expression.textContent += ".";
            this.expression.appendChild(this.cursor);
        });

        this.allclear.addEventListener("click", () => {
            if (!this.isCalculatorOn()) return;

            this.blink = setInterval(this.handleBlink, 500);

            this.expression.textContent = "";
            this.evaluation.textContent = "";
            if (this.setupStates.shift == true) {
                this.setup.childNodes.forEach((child) =>
                    this.setupChildNodes.push(child)
                );
                this.setup.innerHTML = "";
                this.setupStates.shift = false;
                this.setupStates.on = false;
            } else {
                this.expression.appendChild(this.cursor);
            }
        });

        this.del.addEventListener("click", () => {
            if (!this.isCalculatorOn()) return;

            if (this.temp.length) {
                this.temp = this.temp.slice(0, -1);
            } else {
                this.operators.pop();
            }
            this.expression.removeChild(this.cursor);
            this.expression.textContent = this.expression.textContent.slice(
                0,
                -1
            );
            this.expression.appendChild(this.cursor);
        });

        this.arithmeticKeys.forEach((key) => {
            key.addEventListener("click", () => {
                if (!this.isCalculatorOn()) return;

                if (this.temp.length > 0) {
                    const number = Number(this.temp);
                    this.numbers.push(number);
                    this.temp = "";
                }
                const operator = key.textContent;
                this.operators.push(operator);
                this.expression.removeChild(this.cursor);
                this.expression.textContent += operator;
                this.expression.appendChild(this.cursor);
            });
        });

        this.equalsTo.addEventListener("click", () => {
            if (!this.isCalculatorOn()) return;

            if (this.temp.length > 0) {
                const number = Number(this.temp);
                this.numbers.push(number);
                this.temp = "";
            }
            this.expression.removeChild(this.cursor);
            clearInterval(this.blink);
            this.allExpressions = this.expression.textContent.trim();
            console.log(this.allExpressions);

            while (this.operators.length) {
                if (this.operators.includes("(")) {
                    this.operate("(");
                } else if (this.operators.includes("/")) {
                    this.operate("/");
                } else if (this.operators.includes("x")) {
                    this.operate("x");
                } else if (this.operators.includes("+")) {
                    this.operate("+");
                } else {
                    this.operate("-");
                }
            }
            this.evaluation.textContent = this.allExpressions;
        });
    }

    operate(op) {
        let operatorCount = 0;
        this.operators.forEach((operator) => {
            if (operator == op) {
                operatorCount++;
            }
        });
        while (operatorCount != 0) {
            let index = this.allExpressions.indexOf(op);
            let count = 1;
            console.log(index);
            let firstNumber = 0;
            let secondNumber = 0;
            let j = 1;
            let flag = false;
            while (
                !isNaN(this.allExpressions[index - count]) ||
                this.allExpressions[index - count] == "."
            ) {
                if (this.allExpressions[index - count] == ".") {
                    firstNumber = firstNumber / j;
                    j = 1;
                    count++;
                    continue;
                }

                firstNumber =
                    Number(this.allExpressions[index - count]) * j +
                    firstNumber;
                j *= 10;
                count++;
            }
            console.log("firstNumber", firstNumber, typeof firstNumber);
            count = 1;
            while (
                !isNaN(this.allExpressions[index + count]) ||
                this.allExpressions[index + count] == "."
            ) {
                if (this.allExpressions[index + count] == ".") {
                    flag = true;
                    count++;
                    j = 10;
                    continue;
                }
                if (flag) {
                    secondNumber =
                        secondNumber +
                        Number(this.allExpressions[index + count]) / j;
                    j *= 10;
                } else {
                    secondNumber =
                        secondNumber * 10 +
                        Number(this.allExpressions[index + count]);
                }
                count++;
            }

            console.log("secondNumber", secondNumber, typeof secondNumber);
            let exp = firstNumber + op + secondNumber;
            if (op == "/") {
                if (secondNumber == 0) {
                    this.expression.textContent = "Math ERROR";
                    this.result = "";
                } else {
                    this.result = firstNumber / secondNumber;
                }
            } else if (op == "x") {
                this.result = firstNumber * secondNumber;
            } else if (op == "+") {
                this.result = firstNumber + secondNumber;
            } else {
                this.result = firstNumber - secondNumber;
            }

            this.allExpressions = this.allExpressions.replace(exp, this.result);
            this.operators.splice(this.operators.indexOf(op), 1);

            console.log(this.result);
            operatorCount--;
            console.log("all", this.allExpressions);
            console.log("operators", this.operators);
        }
    }

    handleBlink() {
        if (this.cursor.classList.contains("active")) {
            this.cursor.classList.remove("active");
            this.cursor.classList.add("inactive");
        } else {
            this.cursor.classList.remove("inactive");
            this.cursor.classList.add("active");
        }
    }
    isCalculatorOn() {
        if (this.setupStates.on) {
            return true;
        } else {
            return false;
        }
    }
}

const calculator = new Calculator();
