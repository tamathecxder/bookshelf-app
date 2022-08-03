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
const WEB_STORAGE_KEY = "BOOKSHELF_APPS";
const CUSTOM_SAVED_EVENT = "saved-bookshelf";
const CUSTOM_RENDER_EVENT = "render-bookshelf";

/**
 * Modal Section
 */

const modal = document.getElementById("myModalElement");
const button = document.getElementById("myModalButton");
const closeModal = document.getElementById("closeModal");
const check = document.getElementById('completed-checkbox');

// check.addEventListener('change', function() {
//   if (!check.checked) {
//     check.value = 'tidak memek'
//     console.log(check.value);
//   } else {
//     check.value = 'memek'
//     console.log(check.value);
//   }
// });

// ketika user click button nya, maka modal akan terbuka
button.addEventListener("click", () => {
  modal.style.display = "block";
});

// ketika user click pada closeModal, maka modal nya akan tertutup
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// ketika user click dimanapun diluar modal, maka modal juga akan tertutup
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

/**
 * Nav and Tabs section
 */


function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function isWebStorageExist() {
  if (typeof Storage === undefined) {
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

function isCheckboxTrue() {
  const checkbox = document.getElementById("completed-checkbox");

  if (checkbox.checked) {
    checkbox.value = true;
  } else {
    checkbox.value = false;
  }

  return checkbox.value;
}


function addBookList() {
  const titleInput = document.getElementById("title").value;
  const authorInput = document.getElementById("author").value;
  const yearInput = document.getElementById("year").value;
  
  const completedValue = isCheckboxTrue(); 
  let isBooleanSet = (completedValue === 'true');
  
  const generatedRandomID = generateId();
  const bookObject = generateBookObject(generatedRandomID, titleInput, authorInput, yearInput, isBooleanSet);
  books.push(bookObject);

  document.dispatchEvent(new Event(CUSTOM_RENDER_EVENT));
  saveDataToStorage();
}

function findBook(bookId) {
  for (const book of books) {
    if (book.id === bookId) {
      return book;
    }
  }

  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(CUSTOM_RENDER_EVENT));
  saveDataToStorage();
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(CUSTOM_RENDER_EVENT));
  saveDataToStorage();
}

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(CUSTOM_RENDER_EVENT));
  saveDataToStorage();
}

function makeBook(bookObject) {
  const title = document.createElement('h3');
  title.innerText = bookObject.title;
  title.classList.add('title');

  const bookAuthorText = document.createElement('p');
  const bookAuthorValue = document.createElement('h4');
  bookAuthorText.innerText = 'Author:';
  bookAuthorValue.innerText = bookObject.author;
  
  const bookYearText = document.createElement('p');
  const bookYearValue = document.createElement('h4');
  bookYearText.innerText = 'Year:';
  bookYearValue.innerText = bookObject.year;

  const descContentContainer_author = document.createElement('div');
  const descContentContainer_year = document.createElement('div');

  descContentContainer_author.classList.add('desc-content');
  descContentContainer_year.classList.add('desc-content');

  descContentContainer_author.append(bookAuthorText, bookAuthorValue);
  descContentContainer_year.append(bookYearText, bookYearValue);

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('description');
  descriptionContainer.append(descContentContainer_author, descContentContainer_year);
  
  const cardShowContainer = document.createElement('div');
  cardShowContainer.classList.add('card-show');
  cardShowContainer.append(title, descriptionContainer);

  // button wrapper
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons');
  
  // delete book global variable
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn-delete');
  deleteButton.innerText = 'Delete';

  // checking book conditions
  if (bookObject.isComplete) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('btn-mark', 'bg-yellow');
    undoButton.innerText = "Undo from completed";

    undoButton.addEventListener('click', function() {
      undoBookFromCompleted(bookObject.id);
    });

    deleteButton.addEventListener('click', function() {
      removeBook(bookObject.id);
    });

    buttonsContainer.append(deleteButton, undoButton);
    cardShowContainer.append(buttonsContainer);
  } else {
    const completedButton = document.createElement('button');
    completedButton.classList.add('btn-mark');
    completedButton.innerText = 'Add to completed';

    completedButton.addEventListener('click', function() {
      addBookToCompleted(bookObject.id);
    });

    deleteButton.addEventListener('click', function() {
      removeBook(bookObject.id);
    });

    buttonsContainer.append(deleteButton, completedButton);
    cardShowContainer.append(buttonsContainer);
  }
  
  return cardShowContainer;
}

function loadDataFromStorage() {
  const serializeData = localStorage.getItem(WEB_STORAGE_KEY);
  const data = JSON.parse(serializeData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(CUSTOM_RENDER_EVENT));
}

/**
 * All Event Listener
 *
 */

document.addEventListener("DOMContentLoaded", function () {
  const myForm = document.getElementById("myForm");
  
  myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookList();
    
    // reset all input fields value
    myForm.reset();
  });

  if (isWebStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(CUSTOM_RENDER_EVENT, function () {
  console.log(books);
  const uncompletedBookList = document.getElementById('not-finished');
  const completedBookList = document.getElementById('finished');

  uncompletedBookList.innerText = '';
  completedBookList.innerText = '';

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isComplete) {
      uncompletedBookList.appendChild(bookElement);
    } else {
      completedBookList.appendChild(bookElement);
    }
  }
});

document.addEventListener(CUSTOM_SAVED_EVENT, function () {
  console.log("!");
});
