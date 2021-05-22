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
                                    <div class="clipboard-title">Smart Clipboard</div>
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

			if (card.length + 1 === 5) {
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
		// Turncate the text
		const card = document.createElement('DIV');
		const cardText = document.createElement('TEXTAREA');
		if (text.length > 60) {
			card.setAttribute('class', 'clipboard-card');
			cardText.setAttribute('disabled', '');
			cardText.setAttribute('class', 'clipboard-text-area');
			cardText.setAttribute('col', '3');
			cardText.setAttribute('rows', '5');
			cardText.textContent += text;
			card.appendChild(cardText);
			// Add dot to tell user that some text is omitted
			const dot = document.createTextNode('...');
			card.appendChild(dot);
		} else {
			card.setAttribute('class', 'clipboard-card');
			cardText.setAttribute('class', 'clipboard-text-area');
			cardText.setAttribute('disabled', '');
			cardText.setAttribute('col', '3');
			cardText.setAttribute('rows', '5');
			cardText.textContent += text;
			card.appendChild(cardText);
		}

		const board = document.querySelector('.clipboard-body');
		// Check if there's any card in the board
		if (board.firstChild) {
			//  if yes, add the new card to the beginning as the first child
			const ref = board.firstChild;
			board.insertBefore(card, ref);
		} else {
			// if no, simply add it to the board
			board.appendChild(card);
		}
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
function removeCard() {
	// Remove the one that has existed in the list for the longest
	const parent = document.querySelector('.clipboard-body');
	parent.removeChild(parent.lastChild);
}

// Event handlers for copy on click
clipboard.addEventListener('click', (e) => {
	// Initialise the text
	let text = '';
	if (e.target.classList.contains('clipboard-text-area')) {
		// set the clip board text to the text contains in the card
		text = e.target.value;
		console.log(text);
		navigator.clipboard.writeText(text).then(() => {
			console.log('copied');
		});
		// Let the user knows that the text has been copied
		flashAlert();
	} else if (e.target.firstChild.className === 'clipboard-text-area') {
		// set the clip board text to the text contains in the card
		text = e.target.firstChild.value;
		console.log(text);
		navigator.clipboard.writeText(text).then(() => {
			console.log('copied');
		});
		// Let the user knows that the text has been copied
		flashAlert();
	}
});

// // Show Alert UI
function flashAlert() {
	const alertMsg = document.createElement('div');
	alertMsg.classList.add('clipboard-alert');
	alertMsg.textContent = 'Copied!';
	const modal = document.querySelector('.clipboard-modal');
	modal.insertBefore(alertMsg, modal.firstChild);
	setTimeout(() => {
		document.querySelector('.clipboard-alert').remove();
	}, 3000);
}
