// UI class to organise the UI template in one single place
class UI {
    constructor() {
        this.body = document.querySelector('body');
    }
    buildBtn() {
        const template = `
                            <div id="open-clipboard">
                                <span id="open-clipboard-text">Open</span>           
                            </div>
                        `;
        this.body.innerHTML += template;
        return document.querySelector('#open-clipboard');
    }

    buildClipboard() {
        const template = `
                            <div class="clipboard-modal">
                                <div class="clipboard-header">
                                    <div class="clipboard-title">Clipboard</div>
                                    <button class="close-clipboard">&times;</button>
                                </div>
                                <div class="clipboard-body"></div>
                            </div>
                        `;
        this.body.innerHTML += template;
    }
    buildOverlay() {
        const template = `<div id="clipboard-overlay"></div>`
        this.body.innerHTML += template;
    }

}
// init UI class and build the UI
const ui = new UI;

ui.buildBtn();

ui.buildClipboard();

ui.buildOverlay();

// get the UI elements for Eventlistener
const openModalButton = document.querySelector('#open-clipboard');
const modal = document.querySelector('.clipboard-modal');
const overlay = document.querySelector('#clipboard-overlay');


// get the body
// const body = document.querySelector('body');

// // UI for open clipboard
// const openModalButtons = document.createElement('div');

// openModalButtons.innerHTML = `<span id="open-clipboard-text">Open</span>`;
// openModalButtons.id = 'open-clipboard'

// body.insertBefore(openModalButtons, body.firstChild);


// UI for modal
// const modal = document.createElement('div');
// modal.classList.add('clipboard-modal');

// const modalContent = `
//                         <div class="clipboard-header">
//                             <div class="clipboard-title">Clipboard</div>
//                             <button class="close-clipboard">&times;</button>
//                         </div>
//                         <div class="clipboard-body">
//                         </div>
//                     `
// modal.innerHTML += modalContent;

// body.insertBefore(modal, body.secondChild);

// UI for overlay
// const overlay = document.createElement('div');
// overlay.id = 'clipboard-overlay';

// body.insertBefore(overlay, body.thirdChild);



// UI Eventlinstener
openModalButton.addEventListener('click', () => {
    console.log('fired');
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
    console.log('fired');
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
    // Get the selected text
    const selectedText = document.getSelection().toString();
    const card = document.querySelectorAll('.clipboard-card');
    
    if(!e.target.classList.contains("clipboard-text-area")) {
        // remove the first card if the number of card is bigger than 4
        removeCard(card);
        // Set clipboard data to allow normal copying
        e.clipboardData.setData('text/plain', selectedText)
        // Turncate the text
        let htmlContent = '';
        if(selectedText.length > 60) {
           htmlContent = `<div class="clipboard-card"><textarea disabled class="clipboard-text-area" cols="3" rows="5">${selectedText}</textarea><div>...</div></div>`;
        } else {
            htmlContent = `<div class="clipboard-card"><textarea disabled class="clipboard-text-area" cols="3" rows="5">${selectedText}</textarea></div>`;
        }
    
        const clipboard = document.querySelector('.clipboard-body');
        clipboard.innerHTML += htmlContent;
    }
    e.preventDefault();
})

function removeCard(elem) {
    if(elem.length > 3) {
        console.log("removed");
        elem[0].remove();
    }
}

// Event handlers for copy on click
modal.addEventListener('click', (e) => {
    if(e.target.classList.contains("clipboard-text-area")) {
        let copyText = e.target;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        flashAlert(e.target.parentNode.parentNode);
    } else if(e.target.firstChild.className === "clipboard-text-area") {
        console.log(e.target.firstChild);
        let copyText = e.target.firstChild;
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        flashAlert(e.target.parentNode);
    } 
})

// Show Alert UI
function flashAlert(elem) {
    const alertMsg = document.createElement('div');
    alertMsg.classList.add('clipboard-alert');
    alertMsg.textContent = 'Copied!';
    elem.insertBefore(alertMsg, elem.firstChild);
    setTimeout(() => {
        document.querySelector('.clipboard-alert').remove();
    }, 3000)
}