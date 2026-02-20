let chart;

function calculateEMI() {

    let P = parseFloat(document.getElementById("amount").value);
    let annualRate = parseFloat(document.getElementById("rate").value);
    let years = parseFloat(document.getElementById("years").value);

    if (!P || !annualRate || !years || P <= 0 || annualRate <= 0 || years <= 0) {
        alert("Please enter valid positive numbers");
        return;
    }

    let R = annualRate / 12 / 100;
    let N = years * 12;

    let EMI = (P * R * Math.pow(1 + R, N)) /
              (Math.pow(1 + R, N) - 1);

    let totalPayment = EMI * N;
    let totalInterest = totalPayment - P;

    document.getElementById("result").innerHTML =
        `Monthly EMI: ₹${EMI.toFixed(2)} <br>
         Total Payment: ₹${totalPayment.toFixed(2)} <br>
         Total Interest: ₹${totalInterest.toFixed(2)}`;

    drawChart(P, totalInterest);
}

function drawChart(principal, interest) {

    const ctx = document.getElementById('emiChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#667eea', '#ff4d4d']
            }]
        }
    });
}

function resetForm() {
    document.getElementById("amount").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("years").value = "";
    document.getElementById("result").innerHTML = "";
    if (chart) {
        chart.destroy();
    }
}
