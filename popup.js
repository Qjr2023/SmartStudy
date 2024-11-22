document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleAnnotation');
  const tocBtn = document.getElementById('generateTOC');
  const exportBtn = document.getElementById('exportPDF');

  toggleBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'TOGGLE_ANNOTATION_MODE'});
    });
  });

  tocBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'GENERATE_TOC'}, response => {
        if (response.toc) {
          displayTOC(response.toc);
        }
      });
    });
  });

  exportBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'EXPORT_PDF'});
    });
  });
});

