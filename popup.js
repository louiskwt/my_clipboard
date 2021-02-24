chrome.storage.onChanged.addListener(function(changes, sync) {
    let changedItems = Object.keys(changes);
    for(let item of changedItems) {
        console.log(changes[item].oldValue);
        console.log(changes[item].newValue);
    }
});