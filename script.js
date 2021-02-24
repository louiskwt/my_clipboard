window.addEventListener('copy', (e) => {
    let selectedText = document.getSelection();
    selectedText = selectedText.toString();
    console.log(selectedText);
    chrome.storage.sync.set({ 'text': selectedText}, function() {
        console.log('saved')
    })
})