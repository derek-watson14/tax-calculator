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
    } else {
        tax = 0;
    }
    return tax;
};

function taxCalculator(income) {
    let taxTable = [[500000, 0.37], [2000000, 0.35], [157500, 0.32], [82500, 0.24], [38700, 0.22], [9525, 0.12], [0, 0.10]]
    let tax = bracketCalc(taxTable, taxableIncome(income));
    return tax;
};

function tippingPoint(income, highEst, increm, desPer) {
    for (income; income < highEst; income += increm) {
        let tax = taxCalculator(income);
        if (tax / income > desPer) {
            console.log(`Pay $${tax} in tax of $${income} earned for ${desPer * 100}% rate`);
            break;
        }
    }
}


console.log(taxCalculator(40000));
