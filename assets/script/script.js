/**
* 
* JSON Format:
*  [
*    {
*     id: string | number,
      title: string,
      author: string,
      year: number,
      isComplete: boolean,
*    }
*  ]
* 
*/

// Initialize Important Variables
const books = [];
const WEB_STORAGE_KEY = 'BOOKSHELF_APPS';
const CUSTOM_SAVED_EVENT = 'saved-bookshelf';
const CUSTON_RENDER_EVENT = 'render-bookshelf'

const btnChecker = document.querySelectorAll('.button-checker');

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id, title, author, year, isComplete
  };
}

function isWebStorageExist() {
  if (typeof (Storage) === undefined) {
    alert("Your browser does not support the web save feature");
    return false;
  }

  return true; 
}

function saveDataToStorage() {
  if (isWebStorageExist()) {
    const parsedData = JSON.stringify(books);
    localStorage.setItem(WEB_STORAGE_KEY, parsedData);
    document.dispatchEvent(new Event(CUSTOM_SAVED_EVENT));
  }
}

function addBookList() {
  const titleInput = document.getElementById('title').value;
  const authorInput = document.getElementById('author').value;
  const yearInput = document.getElementById('year').value;
  const checkbox = document.getElementById('completed-checkbox').value;

  const generatedRandomID = generateId();
  const bookObject = generateBookObject(generatedRandomID, titleInput, authorInput, yearInput, checkbox);
  books.unshift(bookObject);

  document.dispatchEvent(new Event(CUSTON_RENDER_EVENT));
  saveDataToStorage();
}






/**
 * Modal Section 
 */

const modal = document.getElementById('myModalElement');
const button = document.getElementById('myModalButton')
const closeModal = document.getElementById('closeModal'); 

// ketika user click button nya, maka modal akan terbuka
button.addEventListener('click', () => {
  modal.style.display = 'block';
});

// ketika user click pada closeModal, maka modal nya akan tertutup
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// ketika user click dimanapun diluar modal, maka modal juga akan tertutup
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});


/**
 * Nav and Tabs section
 */
function openTabs(evt, sectionName) {
  let i;
  const tabcontent = document.getElementsByClassName("tabcontent"); 
  const tablinks = document.getElementsByClassName("tablinks"); 
  const sectionTarget = document.getElementById(sectionName);

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  for (i = 0; i < btnChecker.length; i++) {
    if (sectionName == 'finished') {
      btnChecker[i].innerText = 'Mark NOT finished';
    } else {
      btnChecker[i].innerText = 'Mark finished';
    }
  }
  
  sectionTarget.style.display = "flex";
  evt.currentTarget.className += " active";
}


