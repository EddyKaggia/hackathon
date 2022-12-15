// chrome.commands => trigger action based on keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  const highlightedText = selection();
  const url = saveUrl();
  //put the selected text on the the page
 
  const tabsOl = document.querySelector('.tabs');
  const newLi = document.createElement('li');
  const innerTitle = document.createElement('h3');
  
  innerTitle.innerText = url;
  newLi.appendChild(innerTitle);
  tabsOl.appendChild(newLi);
   const newParag = document.createElement('p');
   newLi.appendChild(newParag);
   newParag.innerText = highlightedText;


  
});

 //url functionality  
function saveUrl() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    return url;
  });
}
//select text
function selection() {
  if (window.getSelection) {
    return window.getSelection();
  }
}

// click on the url, if original tab closed, open a new one, if not, return to that tab