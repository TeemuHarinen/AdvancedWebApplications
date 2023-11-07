document.getElementById("submit-data").addEventListener("click", function() {
  const text = document.getElementById("input-text").value;
  const data = { text };

  fetch('/list', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .catch(error => console.error(error));
});
