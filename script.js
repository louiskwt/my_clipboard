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
    
    if(!e.target.classList.contains("clipboard-card-text")) {
        // Set clipboard data to allow normal copying
        e.clipboardData.setData('text/plain', selectedText)
        // add selected text to the clipboard
        let displayedText = selectedText;
        // turncate the display text
        if(displayedText.length >= 60) {
            // keep the length of the text at 60 chracter
            displayedText = displayedText.slice(0, 60) + " ..."
        }
        const clipboard = document.querySelector('.clipboard-body');
        clipboard.innerHTML += `<div class="clipboard-card"><span class="clipboard-card-text" id="${selectedText}">${displayedText}</span></div>`;
    }
    e.preventDefault();
})

// Event handlers for copy on click
// body.addEventListener('click', (e) => {
//     if(e.target.classList.contains("clipboard-card-text")) {
//         console.log(e.target.id);
//         e.clipboardData.setData('text/plain', e.target.id);

//     }
// })