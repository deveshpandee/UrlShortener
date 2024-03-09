document.getElementById('shortenButton').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value;
  if (url) {
    document.getElementById('result').textContent = 'Shortening URL...';
    browser.runtime.sendMessage({ action: 'shortenURL', url })
      .then(response => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        if (response.success) {
          const shortenedLink = document.createElement('a');
          shortenedLink.href = response.shortURL;
          shortenedLink.target = '_blank';
          shortenedLink.textContent = response.shortURL;
          resultDiv.appendChild(shortenedLink);
        } else {
          resultDiv.textContent = `Error: ${response.error}`;
        }
      })
      .catch(error => {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `Error: ${error.message}`;
      });
  } else {
    document.getElementById('result').textContent = 'Please enter a valid URL.';
  }
});
