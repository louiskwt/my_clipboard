# Smart Clipboard

#### Video Demo: <URL HERE>

#### Description:

My-Clipboard is a chrome extension that allows user store the text they copied inside a clipboard in Chrome. I decided to develop this extension because I had to do a lot of copy and paste at work and during online lessons. This extension, I hope, can help people perform copying and pasting more efficiently.

Inside this chrome extension file, you can find a manifest.json files which tells chrome how the extension should behave and what files it should run or include.

Moving on, you can see a popup.html file which contains the intructions of how to use the extension, and the user can open the popup by first pinning the extension to the manual bar and click the icon for My Clipboard (which is a board icon).

For the script.js files, it has all the functions for the clipboard extension. It is written in JavaScript, and it utilises the Clipboard API to access the content stored in your clipboard. Besides that, it inserts HTML element to every page that the user has opened in order to generate a clipboard and store the copied text for the user. The style of the clipboard is orginised by the CSS rules that are stored in the style.css file.

Last but not least, there is a .gitignore file to exclude some of the test folder that I used in development to test out my extension as well as the .DS_Store file. On top of that, there's an icon128.png file which is the icon for the extension as well as the README.md file that you're reading now : )
