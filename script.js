let displayValue = '';

function appendToDisplay(value) {
    displayValue += value;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function calculate() {
    try {
        displayValue = eval(displayValue).toString();
    } catch (e) {
        displayValue = 'Error';
    }
    updateDisplay();
}
