function showQuote() {
  const birthdayInput = document.getElementById("birthday").value;
  if (!birthdayInput) {
    alert("Төрсөн өдрөө оруулна уу!");
    return;
  }

  fetch('quotes.json')
    .then(res => res.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const selectedQuote = data[randomIndex];
      document.getElementById("quote").textContent = selectedQuote;
      document.getElementById("quote-section").style.display = 'block';
    });
}
