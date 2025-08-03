# SIP Calculator with Inflation Adjustment

This project is a simple Systematic Investment Plan (SIP) calculator built using HTML, CSS, JavaScript, and Chart.js.  
It helps users estimate the future value of their monthly investments, with an option to adjust the returns for inflation, and visualizes the results year by year.

---
## Screenshots

Below are some screenshots of the calculator in action:

![SIP Calculator - Main Screen](https://github.com/Deeprawat001/SIP_Calculator/blob/d7b738a9f670eca23993abe9ed06d0b27bd0ea0b/0408.png)  
*Main input screen*

![SIP Calculator - Chart View](https://github.com/Deeprawat001/SIP_Calculator/blob/d7b738a9f670eca23993abe9ed06d0b27bd0ea0b/04082.png
)  
*Line chart showing nominal and inflation-adjusted values*

![SIP Calculator - Breakdown Table](https://github.com/Deeprawat001/SIP_Calculator/blob/d7b738a9f670eca23993abe9ed06d0b27bd0ea0b/04083.png)  
*Year-by-year breakdown table*

---
## Features

- Calculates the future value of a monthly SIP based on user inputs
- Adjusts future value for expected annual inflation
- Interactive sliders and inputs for quick updates
- Line chart to visualize the nominal and real (inflation-adjusted) value over time
- Detailed year-by-year breakdown of invested amount, interest earned, total value, and real value

---

## How it Works

The calculator uses the standard SIP future value formula:<br>
FV = P × [ ((1 + r)^n - 1) / r ] × (1 + r)<br>

where:<br>

- **P** is the monthly investment
- **r** is the monthly rate of return
- **n** is the total number of months

The real value is calculated by adjusting the final amount for inflation:<br>
FV_real = FV / (1 + inflation_rate) ^ years<br>

---

## Technologies Used

- HTML and CSS for structure and styling
- JavaScript for calculation logic and DOM updates
- Chart.js for plotting the investment growth chart

---

## How to Use

1. Open the HTML file in a web browser.
2. Use the sliders or input fields to enter:
   - Monthly SIP amount
   - Number of years to invest
   - Expected annual return percentage
   - Expected annual inflation percentage
3. Click the "Calculate" button to update the chart and see the results.
4. The result section shows the invested amount, total interest earned, final value, and inflation-adjusted value.
5. A breakdown table below the chart shows year-wise details.

---
## Project Structure
```
sip-calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```
---

## Running the Project

This is a simple static web page. No server setup is required.  
Open `index.html` in any modern web browser.

---

## License

This project is free to use and modify for learning or personal finance use.

