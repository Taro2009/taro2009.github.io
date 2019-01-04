// konstansok
const STATUS_FIRSTNUM = 'firstnum',
    STATUS_OPERAND = 'operand',
    STATUS_SECONDNUM = 'secondnum',
    STATUS_DONE = 'done';

//általános változók

let number1 = null;
let number2 = null;
let operand = null;
let operandCache = null;
let number2Cache = null;
let status = STATUS_FIRSTNUM;

// elemek összegyűjtése kijelzők
let displayNumber1 = document.getElementById('displayNumber1');
let displayOperand = document.getElementById('displayOperand');
let displayNumber2 = document.getElementById('displayNumber2');

// console.log(displayNumber1, displayNumber2, displayOperand); számok
let button0 = document.getElementById('button0');
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let button5 = document.getElementById('button5');
let button6 = document.getElementById('button6');
let button7 = document.getElementById('button7');
let button8 = document.getElementById('button8');
let button9 = document.getElementById('button9');

// műveletek

let buttonCE = document.getElementById('buttonCE');
let buttonAdd = document.getElementById('buttonAdd');
let buttonMinus = document.getElementById('buttonMinus');
let buttonTimes = document.getElementById('buttonTimes');
let buttonDivide = document.getElementById('buttonDivide');
let buttonEquals = document.getElementById('buttonEquals');

// feliratkozás

button0.addEventListener('click', onNumberClick);
button1.addEventListener('click', onNumberClick);
button2.addEventListener('click', onNumberClick);
button3.addEventListener('click', onNumberClick);
button4.addEventListener('click', onNumberClick);
button5.addEventListener('click', onNumberClick);
button6.addEventListener('click', onNumberClick);
button7.addEventListener('click', onNumberClick);
button8.addEventListener('click', onNumberClick);
button9.addEventListener('click', onNumberClick);

buttonCE.addEventListener('click', onOperandClick);
buttonAdd.addEventListener('click', onOperandClick);
buttonMinus.addEventListener('click', onOperandClick);
buttonTimes.addEventListener('click', onOperandClick);
buttonDivide.addEventListener('click', onOperandClick);
buttonEquals.addEventListener('click', onOperandClick);

// gombnyomásra reagálás

function onNumberClick() {

    let currentButton = this;
    let currentNumber = +currentButton.innerText;
    // console.log(currentNumber);

    switch (status) {
        case STATUS_FIRSTNUM:
            setNumber1(number1 * 10 + currentNumber);
            break;
        case STATUS_OPERAND:
            setNumber2(number2 * 10 + currentNumber);
            status = STATUS_SECONDNUM;
            break;
        case STATUS_SECONDNUM:
            setNumber2(number2 * 10 + currentNumber);
            break;
        case STATUS_DONE:
            setNumber1(null);
            setNumber1(number1 * 10 + currentNumber);
            break;

    }
    console.log('Státusz: ', status);

}

function onOperandClick() {

    let currentButton = this;
    let currentOperand = currentButton.innerText;

    if (currentOperand == 'CE') {
        status = STATUS_FIRSTNUM;
        setNumber1(0);
        setNumber2(null);
        setOperand(null);
    } else {

        switch (status) {
            case STATUS_FIRSTNUM:
                if (currentOperand == '=') {
                    break;
                } else {

                    setOperand(currentOperand);
                    status = STATUS_OPERAND;
                    break;
                }
            case STATUS_OPERAND:
                if (currentOperand == '=') {
                    break;
                } else {
                    setOperand(currentOperand);
                    break;
                }
            case STATUS_SECONDNUM:
                operandCache = operand;
                number2Cache = number2;
                let result = eval(number1 + operand + number2);
                console.log('Result: ', result);
                setNumber1(result);
                setNumber2(null);
                if (currentOperand == '=') {
                    setOperand(null);
                    status = STATUS_DONE;
                    break;
                } else {
                    setOperand(currentOperand);
                    status = STATUS_OPERAND;
                    break;
                }
            case STATUS_DONE:
                if (currentOperand == '=') {
                    // ha egyenlőségjel nyomása után megint azt nyomunk, ismételjük meg a legutóbb elvégzett műveletet!
                    setNumber1(eval(number1 + operandCache + number2Cache));
                    break;
                } else {
                    
                    setOperand(currentOperand);
                    status = STATUS_OPERAND;
                    break;
                }
        }
    }
    console.log('Státusz: ', status);
}

// értékbeállító függvények
function setNumber1(value) {
    number1 = value;
    displayNumber1.innerText = value;

}
function setNumber2(value) {
    number2 = value;
    displayNumber2.innerText = value;

}
function setOperand(value) {
    operand = value;
    displayOperand.innerText = value;

}
