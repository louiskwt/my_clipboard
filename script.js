// UI class to organise the UI template in one single place
class UI {
    constructor() {
        this.body = document.querySelector('body');
    }
    buildBtn() {
        const btn = document.createElement('div');
        btn.id = "open-clipboard";
        const template = `<span id="open-clipboard-text">Open</span>`;
        btn.innerHTML += template;
        this.body.insertBefore(btn, this.body.firstChild);
        return document.querySelector('#open-clipboard');
    }

    buildClipboard() {
        const clipboard = document.createElement('div');
        clipboard.classList.add('clipboard-modal');
        const template = `
                                <div class="clipboard-header">
                                    <div class="clipboard-title">Clipboard</div>
                                    <button class="close-clipboard">&times;</button>
                                </div>
                                <div class="clipboard-body"></div>
                        `;
        clipboard.innerHTML += template;
        this.body.insertBefore(clipboard, this.body.secondChild);
        return document.querySelector('.clipboard-modal');
    }
    buildOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'clipboard-overlay';
        this.body.insertBefore(overlay, this.body.secondChild);
        return document.querySelector('#clipboard-overlay');
    }

}
// init UI class and build the UI
const ui = new UI;


const openClipboardBtn = ui.buildBtn();
const clipboard = ui.buildClipboard();
const overlay = ui.buildOverlay();

// UI Eventlinstener
openClipboardBtn.addEventListener('click', () => {
    console.log('fired');
    openClipboard(clipboard);
})

clipboard.addEventListener('click', (e) => {
    console.log('fired');
    if(e.target.classList.contains('close-clipboard')) {
        closeClipboard(clipboard);
    }
})

overlay.addEventListener('click', () => {
    const clipboard = document.querySelector('.clipboard-modal.active');
    closeClipboard(clipboard);
})


// // Functions to open and close clipboard modal
function openClipboard(clipBoard) {
    console.log('fired');
    if(clipBoard == null) return
    clipBoard.classList.add('active');
    overlay.classList.add('active');
}

function closeClipboard(clipBoard) {
    if(clipBoard == null) return
    clipBoard.classList.remove('active');
    overlay.classList.remove('active');
}

// Eventt Listener for copying text
ui.body.addEventListener('copy', (e) => {
    // checking
    console.log("copied")
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
    
        const board = document.querySelector('.clipboard-body');
        board.innerHTML += htmlContent;
    }
    e.preventDefault();
})

function removeCard(elem) {
    if(elem.length > 3) {
        console.log("removed");
        elem[0].remove();
    }
}

// // Event handlers for copy on click
clipboard.addEventListener('click', (e) => {
    console.log("fired");
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

// // Show Alert UI
function flashAlert(elem) {
    const alertMsg = document.createElement('div');
    alertMsg.classList.add('clipboard-alert');
    alertMsg.textContent = 'Copied!';
    elem.insertBefore(alertMsg, elem.firstChild);
    setTimeout(() => {
        document.querySelector('.clipboard-alert').remove();
    }, 3000)
}

