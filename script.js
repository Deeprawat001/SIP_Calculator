function linkSliderInput(sliderId, inputId) {
  const slider = document.getElementById(sliderId);
  const input = document.getElementById(inputId);

  slider.addEventListener('input', () => {
    input.value = slider.value;
  });

  input.addEventListener('input', () => {
    slider.value = input.value;
  });
}

document.getElementById('calculateBtn').addEventListener('click', updateSIP);

linkSliderInput('monthlySlider', 'monthlyInput');
linkSliderInput('yearSlider', 'yearInput');
linkSliderInput('rateSlider', 'rateInput');
linkSliderInput('inflationSlider', 'inflationInput');

const ctx = document.getElementById('sipChart').getContext('2d');
const sipChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Nominal Value',
        data: [],
        borderColor: '#2563eb',
        fill: false,
      },
      {
        label: 'Real Value (Adjusted for Inflation)',
        data: [],
        borderColor: '#10b981',
        fill: false,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { mode: 'index', intersect: false }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        title: { display: true, text: 'Year', color: '#fff' },
        ticks: { color: '#fff' }
      },
      y: {
        title: { display: true, text: 'Value (₹)', color: '#fff' },
        ticks: {
          color: '#fff',
          font: {
            size: 14
          }
        }
      }
    }
  }
});

function updateSIP() {
  const P = parseFloat(document.getElementById('monthlyInput').value) || 0;
  const nYears = parseInt(document.getElementById('yearInput').value) || 0;
  const annualRate = parseFloat(document.getElementById('rateInput').value) / 100 || 0;
  const inflationRate = parseFloat(document.getElementById('inflationInput').value) / 100 || 0;

  const months = nYears * 12;
  const monthlyRate = annualRate / 12;

  let FV = 0;
  if (monthlyRate > 0) {
    FV = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  } else {
    FV = P * months;
  }

  const invested = P * months;
  const interest = FV - invested;
  const FVReal = FV / Math.pow(1 + inflationRate, nYears);

  // Correct chart points
  const labels = [];
  const nominal = [];
  const real = [];

  for (let year = 1; year <= nYears; year++) {
    const yearMonths = year * 12;
    let FVY = 0;

    if (monthlyRate > 0) {
      FVY = P * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      FVY = P * yearMonths;
    }

    const FVYReal = FVY / Math.pow(1 + inflationRate, year);

    labels.push(year);
    nominal.push(FVY);
    real.push(FVYReal);
  }

  sipChart.data.labels = labels;
  sipChart.data.datasets[0].data = nominal.map(x => Math.round(x));
  sipChart.data.datasets[1].data = real.map(x => Math.round(x));
  sipChart.update();

  const tbody = document.querySelector('#breakdownTable tbody');
  tbody.innerHTML = '';

  const summary = `
    <div class="result-item">
      <span class="result-label">Invested</span>
      <span class="result-value">₹${invested.toLocaleString()}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Interest Earned</span>
      <span class="result-value">₹${interest.toLocaleString()}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Total Value</span>
      <span class="result-value">₹${FV.toLocaleString()}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Inflation Adjusted</span>
      <span class="result-value">₹${FVReal.toLocaleString()}</span>
    </div>
  `;

  document.getElementById('resultSummary').innerHTML = summary;

  for (let year = 1; year <= nYears; year++) {
    const yearMonths = year * 12;
    const investedY = P * yearMonths;

    let FVY = 0;
    if (monthlyRate > 0) {
      FVY = P * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      FVY = investedY;
    }

    const FVYReal = FVY / Math.pow(1 + inflationRate, year);

    const interestY = FVY - investedY;

    tbody.innerHTML += `
      <tr>
        <td>${year}</td>
        <td>₹${investedY.toLocaleString()}</td>
        <td>₹${interestY.toLocaleString()}</td>
        <td>₹${FVY.toLocaleString()}</td>
        <td>₹${FVYReal.toLocaleString()}</td>
      </tr>
    `;
  }
}
