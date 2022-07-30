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

function addBookList() {
  const titleInput = document.getElementById("title").value;
  const authorInput = document.getElementById("author").value;
  const yearInput = document.getElementById("year").value;
  const checkbox = document.getElementById("completed-checkbox").value;

  const generatedRandomID = generateId();
  const bookObject = generateBookObject(generatedRandomID, titleInput, authorInput, yearInput, checkbox);
  books.unshift(bookObject);

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

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(CUSTOM_RENDER_EVENT));
  saveDataToStorage();
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(CUSTOM_RENDER_EVENT));
  saveDataToStorage();
}

function removeBookBoth(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(CUSTOM_RENDER_EVENT));
  saveDataToStorage();
}

function makeBook(bookObject) {
  const container = document.createElement("div");
  container.setAttribute("id", `book-${bookObject.id}`);

  const cardElement = `
    <div class="card-data col-6">
      <div class="data-text">
        <div class="data-desc">
          <h2>${bookObject.title}</h2>
          <div class="data-sub-desc">
            <h4>Author: </h4>
            <span>${bookObject.author}</span>
          </div>
          <div class="data-sub-desc">
            <h4>Year: </h4>
            <span>${bookObject.year}</span>
          </div>
        </div>
        <div class="data-sub-button">
          <button class="button-checked">BLABLABLA</button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML += cardElement;
  return container;
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
  });

  if (isWebStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(CUSTOM_RENDER_EVENT, function () {
  console.log(books);
  const uncompletedBookList = document.getElementById("finished");
  const completedBookList = document.getElementById("not-finished");

  uncompletedBookList.innerText = "";
  completedBookList.innerText = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      uncompletedBookList.appendChild(bookElement);
    } else {
      completedBookList.appendChild(bookElement);
    }
  }
});

document.addEventListener(CUSTOM_SAVED_EVENT, function () {
  console.log("Data berhasil disimpan");
});
