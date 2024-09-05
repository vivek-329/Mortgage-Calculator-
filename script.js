document.getElementById("calculate-btn").addEventListener("click", function () {
  // Get input values
  const mortgageAmount = parseFloat(
    document.getElementById("mortgage-amount").value
  );
  const mortgageTerm = parseFloat(
    document.getElementById("mortgage-term").value
  );
  const interestRate = parseFloat(
    document.getElementById("interest-rate").value
  );
  const mortgageType = document.querySelector(
    'input[name="mortgage-type"]:checked'
  ).value;

  // Validate input fields
  const amountAlert = document.getElementById("amount-alert");
  const termAlert = document.getElementById("term-alert");
  const rateAlert = document.getElementById("rate-alert");
  const typeAlert = document.getElementById("type-alert");
  let isValid = true;

  if (isNaN(mortgageAmount) || mortgageAmount <= 0) {
    amountAlert.style.display = "block";
    isValid = false;
  } else {
    amountAlert.style.display = "none";
  }

  if (isNaN(mortgageTerm) || mortgageTerm <= 0) {
    termAlert.style.display = "block";
    isValid = false;
  } else {
    termAlert.style.display = "none";
  }

  if (isNaN(interestRate) || interestRate <= 0) {
    rateAlert.style.display = "block";
    isValid = false;
  } else {
    rateAlert.style.display = "none";
  }

  if (!mortgageType) {
    typeAlert.style.display = "block";
    isValid = false;
  } else {
    typeAlert.style.display = "none";
  }

  // Calculate if all inputs are valid
  if (isValid) {
    let monthlyRepayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;

    if (mortgageType === "repayment") {
      // Repayment mortgage formula
      monthlyRepayment =
        (mortgageAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    } else if (mortgageType === "interest-only") {
      // Interest-only mortgage formula
      monthlyRepayment = mortgageAmount * monthlyInterestRate;
    }

    const totalRepayment = monthlyRepayment * numberOfPayments;

    // Display results
    document.getElementById(
      "result"
    ).textContent = `$${monthlyRepayment.toFixed(2)}`;
    document.getElementById(
      "term-result"
    ).textContent = `$${totalRepayment.toFixed(2)}`;

    // Show results container
    document.getElementById("calculations-container").style.display = "block";
    document.getElementById("default-text").style.display = "none";
  }
});

// Clear all inputs and results
document.getElementById("clear-btn").addEventListener("click", function () {
  document.getElementById("mortgage-form").reset();
  document.getElementById("calculations-container").style.display = "none";
  document.getElementById("default-text").style.display = "block";

  // Hide alerts
  document.getElementById("amount-alert").style.display = "none";
  document.getElementById("term-alert").style.display = "none";
  document.getElementById("rate-alert").style.display = "none";
  document.getElementById("type-alert").style.display = "none";
});
