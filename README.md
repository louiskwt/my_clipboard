# Smart Clipboard - A CS50x Final Project

#### Video Demo: https://www.youtube.com/watch?v=XW1__lED5s8

#### Description:

Smart Clipboard is a chrome extension that allows users to store the text they copied inside a clipboard in Chrome browser. It can store up to three pieces of information inside the clipboard, and the stored information is shared among all the tabs that have been opened.

First of all, I decided to develop this extension because I had to do a lot of copy and paste at work and during online lessons. Oftentimes, I need to go back and forth between two tabs just to copy some text from one tab and paste it into the other tab. And if I messed up or forgot to paste the text in before copying another text, I have to copy the text again. So, to optimise my copy and paste workflow, I created this extension for myself. After finishing the project, I hope that Smart Clipboard can help not only myself but other people perform copying and pasting more efficiently as well.

Now, let me walk through the files inside this folder with you. Inside this chrome extension folder, you can find a `manifest.json` file which tells chrome how the extension should behave and what files it should run or include. Moving on, you can see a `popup.html` file which contains the instructions of how to use the extension, and the user can open the popup by first pinning the extension to the manual bar and click the icon for My Clipboard (which is a board icon).

For the `script.js` files, it has all the functions for the clipboard extension. It is written in JavaScript, and it utilises the Clipboard API to access the content stored in your clipboard. Besides that, it inserts an HTML element to every page that the user has opened in order to generate a clipboard and store the copied text for the user. The style of the clipboard is organized by the CSS rules that are stored in the `style.css` file.

Last but not least, there is a .gitignore file to exclude some of the test folder that I used in development to test out my extension as well as the `.DS_Store` file. On top of that, there's an `icon128.png` file which is the icon for the extension as well as the `README.md` file that you're reading now : )

While building this project, I experienced a lot of difficulties with getting the copied text from the user. Originally, I simply traversed the DOM to get the copied text when a copy event was fired. But that is not enough. Furthermore, the text in web applications like Google Docs and Google Slide cannot be accessed through the DOM, so I also make use of the Clipboard API to let users manually save the text they copied in the clipboard.

In addition to getting the copied text, it is also a challenge to store the copied text and share it across the tab. After doing some research about it, I discovered that I can use the chrome.storage API to pass data between tabs because it has a built-in event listener that can listen to the change in storage. Finally, I have a hard time handling the CSS because different websites can have their own CSS rules which can override the style that I have come up for the clipboard. Also, the style of the clipboard definitely has a lot of room for improvement at this stage.

In the future, I will work on the style when I revisit this project. But for now, this was Smart Clipboard.
