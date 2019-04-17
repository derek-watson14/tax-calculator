function taxCalculator(income, start) {
    let taxTable = [[10000000, 0.7], [500000, 0.37], [2000000, 0.35], [157500, 0.32], 
                    [82500, 0.24], [38700, 0.22], [9525, 0.12], [0, 0.10]];
    if (start === 1) taxTable.shift();
    let tax = bracketCalc(taxTable, taxableIncome(income));
    return tax;
};

function taxableIncome(income) { 
    if (income > 12000) return income - 12000;
    else return 0;
};

function bracketCalc(taxTable, income) {
    let tax = 0;
    if (income > 0) {
        for (let b = 0; b < taxTable.length; b++) {
            if (income > taxTable[b][0]) {   
                tax += (income - taxTable[b][0]) * taxTable[b][1];
                income -= income - taxTable[b][0];
            }
        }          
    }
    return tax;
};

function displayEmpty() {
  document.getElementById('income').innerHTML = "";
  document.getElementById('taxes-paid').innerHTML = "";
  document.getElementById('takehome').innerHTML = "";
  document.getElementById('effective').innerHTML = "";
}

function effective(income, tax) {
    return ((tax / income) * 100).toFixed(2);
}

function includeBracket() {
  if (document.querySelectorAll('.extra-bracket')[0].checked == true) {
    return 1;
  } else return 0;
}

let input = document.querySelectorAll('.income');
let submission = document.querySelectorAll('.submit-button');

submission[0].onclick = function() {
    console.log(includeBracket())
    if (parseFloat(input[0].value) > 0) {
        let income = parseFloat(input[0].value);
        let tax = taxCalculator(income, includeBracket());
        let takehome = income - tax;
        let rate = effective(income, tax);
        let incomeDisp = `<strong>${income.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</strong>`;
        let taxesDisp = `<strong>${tax.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</strong>`; 
        let takehomeDisp = `<strong>${takehome.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</strong>`;
        let effectiveDisp = `<strong>${rate}%</strong>`
        document.getElementById('income').innerHTML = incomeDisp;
        document.getElementById('taxes-paid').innerHTML = taxesDisp;
        document.getElementById('takehome').innerHTML = takehomeDisp;
        document.getElementById('effective').innerHTML = effectiveDisp;
    } else {
        displayEmpty();
    }
};

input[0].onkeyup = function() {
  if (!parseFloat(input[0].value)) {
    displayEmpty();
  } 
};
