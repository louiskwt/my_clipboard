// get the body
const body = document.querySelector('body');

// UI for open clipboard
const openModalButtons = document.createElement('div');

openModalButtons.innerHTML = `<span id="open-clipboard-text">Open</span>`;
openModalButtons.id = 'open-clipboard'

body.insertBefore(openModalButtons, body.firstChild);


// UI for modal
const modal = document.createElement('div');
modal.classList.add('clipboard-modal');

const modalContent = `
                        <div class="clipboard-header">
                            <div class="clipboard-title">Clipboard</div>
                            <button class="close-clipboard">&times;</button>
                        </div>
                        <div class="clipboard-body">
                        </div>
                    `
modal.innerHTML += modalContent;

body.insertBefore(modal, body.secondChild);

// UI for overlay
const overlay = document.createElement('div');
overlay.id = 'clipboard-overlay';

body.insertBefore(overlay, body.thirdChild);



// UI Eventlinstener
openModalButtons.addEventListener('click', () => {
    openModal(modal);
})

modal.addEventListener('click', (e) => {
    console.log('fired');
    if(e.target.classList.contains('close-clipboard')) {
        closeModal(modal);
    }
})

overlay.addEventListener('click', () => {
    const Modal = document.querySelector('.clipboard-modal.active');
    closeModal(Modal);
})


// Functions to open and close clipboard modal
function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if(modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
}


window.addEventListener('copy', (e) => {
    const selectedText = document.getSelection().toString();
    
    if(!e.target.classList.contains("clipboard-text-area")) {
        // Set clipboard data to allow normal copying
        e.clipboardData.setData('text/plain', selectedText)
        // Turncate the text
        let htmlContent = '';
        if(selectedText.length > 60) {
           htmlContent = `<div class="clipboard-card"><textarea disabled class="clipboard-text-area" cols="10" rows="5">${selectedText}</textarea><div>...</div></div>`;
        } else {
            htmlContent = `<div class="clipboard-card"><textarea disabled class="clipboard-text-area" cols="10" rows="5">${selectedText}</textarea></div>`;
        }
    
        const clipboard = document.querySelector('.clipboard-body');
        clipboard.innerHTML += htmlContent;
    }
    e.preventDefault();
})

// Event handlers for copy on click
body.addEventListener('click', (e) => {
    if(e.target.classList.contains("clipboard-text-area")) {
        let copyText = e.target
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Copied!");
    }
})