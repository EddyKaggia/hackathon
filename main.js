// chrome.commands => trigger action based on keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  //const highlightedText = selection();
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
  //newParag.innerText = highlightedText;

});


 //url functionality  
function saveUrl() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    console.log(url);
    return url;
  });
}
//select text
function selection() {
  if (window.getSelection) {
    return window.getSelection();
  }
}

// function myFunction() {
//     // Get the text field
//     let copyText = document.getElementById("text");
  
//     // Select the text field
//     copyText.select();
//     copyText.setSelectionRange(0, 99999); // For mobile devices
  
//     // Copy the text inside the text field
//     navigator.clipboard.writeText(copyText.value);
//     newParag.innerText = copyText.value;
    
//     // Alert the copied text
//     //alert("Copied the text: " + copyText.value);

//   }
const button = document.querySelector(".button");
button.addEventListener('click', myFunction);

let index ='key';

function myFunction() {
      // Get the text field
  let copyText = document.getElementById("text");

  const tabsOl = document.querySelector('.tabs');
  const newLi = document.createElement('li');
  // const innerTitle = document.createElement('h3');

  // innerTitle.innerText = 'url';
  // newLi.appendChild(innerTitle);
  tabsOl.appendChild(newLi);
  const newParag = document.createElement('p');
  newParag.innerText = copyText.value;
  newLi.appendChild(newParag);

  
  saveToStorage(index, copyText.value);
  
  copyText.value = '';

  return
}

async function saveToStorage (index, value) {
  await chrome.storage.local.set({ index: value }).then(() => {
    console.log("Value is set to " + index + ':'+ value);
  });

  await chrome.storage.local.get([index]).then((result) => {
    console.log(result);
  });
}





// click on the url, if original tab closed, open a new one, if not, return to that tab

//if possible, close inactive tabs after a certain amount of time 
function closeTabs() {
    chrome.tabs.query({}, tabs => { //pass in some criteria to select inactive tabs
        tabs.forEach((tab) => {
            chrome.tabs.remove(tab)
        });
    });
}

navigator.permissions.query({name: "clipboard-write"}).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      /* write to the clipboard now */
    }
  });
