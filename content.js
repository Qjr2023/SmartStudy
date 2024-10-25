chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "highlight") {
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach((paragraph) => {
            paragraph.style.backgroundColor = 'yellow';
        });
    }
});
