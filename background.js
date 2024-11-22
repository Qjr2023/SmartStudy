chrome.runtime.onInstalled.addListener(() => {
  console.log('SmartStudy Extension Installed');
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SUMMARIZE_TEXT') {
    // Here you would integrate with an AI API for summarization
    // For hackathon purposes, you could use a simple API like OpenAI
    summarizeText(message.text).then(summary => {
      sendResponse({ summary });
    });
    return true; // Will respond asynchronously
  }
});
