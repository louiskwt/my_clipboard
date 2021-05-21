// UI class to organise the UI template in one single place
class UI {
	constructor() {
		this.body = document.querySelector('body');
	}
	buildBtn() {
		const btn = document.createElement('div');
		btn.id = 'open-clipboard';
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
const ui = new UI();

const openClipboardBtn = ui.buildBtn();
const clipboard = ui.buildClipboard();
const overlay = ui.buildOverlay();

// Clipboard UI Eventlinstener
openClipboardBtn.addEventListener('click', () => {
	console.log('fired');
	// Check if anything in the clipboard that hasn't been added to the board
	const card = document.querySelectorAll('.clipboard-card');
	let clipboardText = '';
	navigator.clipboard
		.readText()
		.then((clipText) => {
			console.log(clipText);
			clipboardText = clipText;
			console.log(clipboard.children.length);
			if (card) {
				removeCard(card);
			}
			if (clipboardText.length > 0) {
				createCard(clipboardText);
			}
		})
		.catch((err) => {
			console.log(err);
			clipboardText = '';
		});

	openClipboard(clipboard);
});

clipboard.addEventListener('click', (e) => {
	console.log('fired');
	if (e.target.classList.contains('close-clipboard')) {
		closeClipboard(clipboard);
	}
});

overlay.addEventListener('click', () => {
	const clipboard = document.querySelector('.clipboard-modal.active');
	closeClipboard(clipboard);
});

// Functions to open and close clipboard modal
function openClipboard(clipBoard) {
	console.log('fired');
	if (clipBoard == null) return;
	clipBoard.classList.add('active');
	overlay.classList.add('active');
}

function closeClipboard(clipBoard) {
	if (clipBoard == null) return;
	clipBoard.classList.remove('active');
	overlay.classList.remove('active');
}

// Event Listener for stoarge change to allow sharing the copied text with other active tabs
chrome.storage.onChanged.addListener(catchStorageChange);

// Eventt Listener for copying text
// ui.body.addEventListener('copy', (e) => {
// 	const card = document.querySelectorAll('.clipboard-card');

// 	if (e.target.classList.contains('clipboard-text-area')) {
// 		const copiedText = e.target;
// 		e.clipboardData.setData('text/plain', copiedText.value);
// 		console.log('copied clipboard text');
// 	}
// 	const childElement = e.target.firstChild;
// 	console.log(childElement);

// 	if (e.target.firstChild.classList.contains('clipboard-text-area')) {
// 		const copiedText = e.target.firstChild;
// 		e.clipboardData.setData('text/plain', copiedText.value);
// 		console.log('copied clipboard text');
// 	}

// 	if (!e.target.classList.contains('clipboard-text-area')) {
// 		// Get the selected text
// 		const selectedText = document.getSelection().toString();
// 		setStorage(selectedText);
// 		// remove the first card if the number of card is bigger than 4
// 		removeCard(card);
// 		// Set clipboard data to allow normal copying
// 		e.clipboardData.setData('text/plain', selectedText);
// 		console.log('Copied non-clipboard text');
// 		createCard(selectedText);
// 	}
// 	e.preventDefault();
// });

// Create card
function createCard(text) {
	// Checked if card has existed to prevent double cpoying
	let isCardExisted = false;
	const cardList = document.querySelector('.clipboard-body').childNodes;

	if (cardList) {
		cardList.forEach((card) => {
			console.log(card.firstChild.textContent);
			if (card.firstChild.textContent === text) {
				isCardExisted = true;
			}
		});
	}

	// check if card existed before adding a card
	if (!isCardExisted) {
		let htmlContent = '';
		// Turncate the text
		if (text.length > 60) {
			htmlContent = `<div class="clipboard-card"><textarea disabled class="clipboard-text-area" cols="3" rows="5">${text}</textarea><div>...</div></div>`;
		} else {
			htmlContent = `<div class="clipboard-card"><textarea disabled class="clipboard-text-area" cols="3" rows="5">${text}</textarea></div>`;
		}

		const board = document.querySelector('.clipboard-body');
		board.innerHTML += htmlContent;
	}
}

// Set storage to update other tabs about the new copied text
function setStorage(text) {
	chrome.storage.sync.set({ card: text }, function () {
		console.log('saved');
	});
}

// catch stoarge change function
function catchStorageChange(changes) {
	const cardList = document.querySelector('.clipboard-body').childNodes;
	let changedItems = Object.keys(changes);
	for (let item of changedItems) {
		// Logging and checking the text
		console.log(typeof changes[item].newValue);
		removeCard(cardList);
		// outputing the text
		createCard(changes[item].newValue);
	}
}

// Remove card function
function removeCard(elem) {
	console.log('removeCard fired');
	if (elem.length > 3) {
		console.log('removed');
		elem[0].remove();
	}
}

// Event handlers for copy on click
clipboard.addEventListener('click', (e) => {
	// Test code
	// console.log("fired");
	// console.log(e.target.classList.contains("clipboard-text-area"));
	// console.log(e.target.firstChild.className === "clipboard-text-area");
	// console.log(e.target);

	if (e.target.classList.contains('clipboard-text-area')) {
		// simply trigger the copy command
		document.execCommand('copy');
		flashAlert(e.target.parentNode.parentNode);
	} else if (e.target.firstChild.className === 'clipboard-text-area') {
		// simply trigger the copy command
		document.execCommand('copy');
		flashAlert(e.target.parentNode);
	}
});

// // Show Alert UI
function flashAlert(elem) {
	const alertMsg = document.createElement('div');
	alertMsg.classList.add('clipboard-alert');
	alertMsg.textContent = 'Copied!';
	elem.insertBefore(alertMsg, elem.firstChild);
	setTimeout(() => {
		document.querySelector('.clipboard-alert').remove();
	}, 3000);
}
