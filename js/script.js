function updateLabel() {
    const tradeType = document.getElementById("tradeType").value;
    const label = document.getElementById("entryLabel");
    label.textContent = tradeType === "long" ? "Buy Price" : "Sell Price";
}

function markInvalid(input) {
    input.classList.add("is-invalid");
}

function clearInvalid(inputs) {
    inputs.forEach(input => input.classList.remove("is-invalid"));
}

function calculateTrade() {
    const entryInput = document.getElementById("entryPrice");
    const stopInput = document.getElementById("stopLoss");
    const rrInput = document.getElementById("rrRatio");
    const capitalInput = document.getElementById("capital");
    const riskInput = document.getElementById("riskPercent");

    const inputs = [entryInput, stopInput, rrInput, capitalInput, riskInput];
    clearInvalid(inputs);

    const tradeType = document.getElementById("tradeType").value;
    const entry = parseFloat(entryInput.value);
    const stop = parseFloat(stopInput.value);
    const rr = parseFloat(rrInput.value);
    const capital = parseFloat(capitalInput.value);
    const riskPercent = parseFloat(riskInput.value);

    let hasError = false;
    if (isNaN(entry)) { markInvalid(entryInput); hasError = true; }
    if (isNaN(stop)) { markInvalid(stopInput); hasError = true; }
    if (isNaN(rr)) { markInvalid(rrInput); hasError = true; }
    if (isNaN(capital)) { markInvalid(capitalInput); hasError = true; }
    if (isNaN(riskPercent)) { markInvalid(riskInput); hasError = true; }

    if (hasError) {
        alert("Please correct the highlighted fields.");
        return;
    }

    const riskPerUnit = Math.abs(entry - stop);
    const target = tradeType === "long"
        ? entry + (riskPerUnit * rr)
        : entry - (riskPerUnit * rr);

    const dollarRisk = (riskPercent / 100) * capital;
    const size = dollarRisk / riskPerUnit;
    const profit = size * Math.abs(target - entry);

    document.getElementById("profitTarget").textContent = target.toFixed(2);
    document.getElementById("positionSize").textContent = size.toFixed(2);
    document.getElementById("profit").textContent = `$${profit.toFixed(2)}`;
}
