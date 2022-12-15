populateStorage();

function populateStorage () {
  chrome.storage.local.get(null, (result) => {
    console.log(result);
    index = Math.max(...Object.keys(result)) + 1;
    for (let key in result) {
      const tabsOl = document.querySelector('.tabs');
      const newLi = document.createElement('li');
      tabsOl.appendChild(newLi);
      const newParag = document.createElement('p');
      newParag.setAttribute('contenteditable', true);
      newParag.innerText = result[key];
      newLi.appendChild(newParag);
    }
  });
}

const buttonSave = document.querySelector('.save');
buttonSave.addEventListener('click', saveNotes);

function saveNotes() {
  
}
