async function shortenURL(longURL) {
  const params = new URLSearchParams({ url: longURL });
  const apiUrl = `http://tinyurl.com/api-create.php?${params.toString()}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to shorten URL. Please try again.');
    }
    return response.text();
  } catch (error) {
    throw new Error('Failed to connect to the URL shortening service. Please try again later.');
  }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'shortenURL') {
    shortenURL(message.url)
      .then(shortURL => {
        sendResponse({ success: true, shortURL });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
  }
  return true;
});
