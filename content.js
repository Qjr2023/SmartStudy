class SmartStudy {
  constructor() {
    this.annotations = [];
    this.selectedContent = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.injectAnnotationUI();
  }

  setupEventListeners() {
    document.addEventListener('mouseup', this.handleTextSelection.bind(this));
    // Add message listener for communication with popup
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
  }

  injectAnnotationUI() {
    const annotationUI = document.createElement('div');
    annotationUI.id = 'smartstudy-annotation-ui';
    annotationUI.innerHTML = `
      <div class="annotation-tools">
        <button id="add-annotation">Add Note</button>
        <button id="highlight">Highlight</button>
      </div>
    `;
    document.body.appendChild(annotationUI);
  }

  handleTextSelection(event) {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      this.selectedContent = {
        text: selection.toString(),
        range: selection.getRangeAt(0)
      };
      this.showAnnotationUI(event);
    }
  }

  async handleMessage(message, sender, sendResponse) {
    switch (message.action) {
      case 'GENERATE_TOC':
        const toc = this.generateTableOfContents();
        sendResponse({ toc });
        break;
      case 'EXPORT_PDF':
        await this.exportToPDF();
        sendResponse({ success: true });
        break;
    }
  }

  generateTableOfContents() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    return Array.from(headings).map(heading => ({
      text: heading.textContent,
      level: parseInt(heading.tagName.substring(1)),
      id: heading.id || this.generateHeadingId(heading)
    }));
  }

  // Add other necessary methods
}

// Initialize SmartStudy
const smartStudy = new SmartStudy();
