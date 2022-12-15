let index = 0;
console.log('hh');

populateStorage();

function populateStorage () {
  chrome.storage.local.get(null, (result) => {
    console.log(result);
    index = Math.max(...Object.keys(result)) + 1;
    for (let key in result) {
      const tabsOl = document.querySelector('.tabs');
      const newLi = document.createElement('li');
      const removeLi = document.createElement('div');

      removeLi.innerText = 'X';
      tabsOl.appendChild(newLi);
      newLi.setAttribute('id', key);
      const newParag = document.createElement('p');
      newParag.innerText = result[key];
      newLi.appendChild(removeLi);
      newLi.appendChild(newParag);

      removeLi.addEventListener('click', () => removeList(newLi));
    }
  });
}

function removeList(ele) {
  const id = ele.getAttribute('id');
  chrome.storage.local.remove(id, () => {});
}

const textarea = document.querySelector('#text')
textarea.focus();
document.execCommand('paste', false, null);


// chrome.commands => trigger action based on keyboard shortcuts
// chrome.commands.onCommand.addListener((command) => {
//   console.log(`Command: ${command}`);
//   //const highlightedText = selection();
//   const url = saveUrl();
//   //put the selected text on the the page
 
//   const tabsOl = document.querySelector('.tabs');
//   const newLi = document.createElement('li');
//   const innerTitle = document.createElement('h3');

//   innerTitle.innerText = url;
//   newLi.appendChild(innerTitle);
//   tabsOl.appendChild(newLi);
//   const newParag = document.createElement('p');
//   newLi.appendChild(newParag);
//   //newParag.innerText = highlightedText;
// });


 //url functionality  
// function saveUrl() {
//   chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     let url = tabs[0].url;
//     // use `url` here inside the callback because it's asynchronous!
//     console.log(url);
//     return url;
//   });
// }
//select text
// function selection() {
//   if (window.getSelection) {
//     return window.getSelection();
//   }
// }

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
const buttonPaste = document.querySelector(".paste");
buttonPaste.addEventListener('click', addNewItem);

const buttonExport = document.querySelector(".export");
buttonExport.addEventListener('click', () => {window.open('export.html')});

const buttonClear = document.querySelector('.clear');
buttonClear.addEventListener('click', () => {clearStorage()});


function addNewItem() {
      // Get the text field
  const copyText = document.getElementById("text");
  if (copyText.value === '') return;
  const tabsOl = document.querySelector('.tabs');
  const newLi = document.createElement('li');

  const removeLi = document.createElement('div');
  removeLi.innerText = 'X';

  newLi.setAttribute('id', index);
  tabsOl.appendChild(newLi);
  const newParag = document.createElement('p');
  newParag.innerText = copyText.value;

  newLi.appendChild(removeLi);
  newLi.appendChild(newParag);

  saveToStorage(index, copyText.value);
  
  copyText.value = '';

  return
}

function saveToStorage (key, value) {
  const obj = {};
  obj[key] = value;
  chrome.storage.local.set(obj, () => {console.log(obj)})

  chrome.storage.local.get(null, (result) => {
    console.log(result);
  });
  index += 1;
}

function clearStorage () {
  chrome.storage.local.clear(() => {})
  index = 0;
  const tabsOl = document.querySelector('.tabs');
  tabsOl.innerHTML = '';
}




// click on the url, if original tab removeLid, open a new one, if not, return to that tab

//if possible, removeLi inactive tabs after a certain amount of time 
// function removeLiTabs() {
//     chrome.tabs.query({}, tabs => { //pass in some criteria to select inactive tabs
//         tabs.forEach((tab) => {
//             chrome.tabs.remove(tab)
//         });
//     });
// }

// navigator.permissions.query({name: "clipboard-write"}).then((result) => {
//     if (result.state === "granted" || result.state === "prompt") {
//       /* write to the clipboard now */
//     }
//   });
