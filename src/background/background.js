function logMessage() {
  console.log("YouTube background script loaded");

  setTimeout(() => {
    logMessage();
  }, 100);
}

logMessage();
