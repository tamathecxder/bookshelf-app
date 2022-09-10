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

// Initialize important variables
const books = [];
const WEB_STORAGE_KEY = "BOOKSHELF_APPS";
const CUSTOM_SAVED_EVENT = "saved-bookshelf";
const CUSTOM_RENDER_EVENT = "render-bookshelf";

/**
 * Input Books Modal Section
 */

const modal = document.getElementById("myModalElement");
const button = document.getElementById("myModalButton");
const closeModal = document.getElementById("closeModal");
const check = document.getElementById("completed-checkbox");

button.addEventListener("click", () => {
  modal.classList.add("show-modal");
  modal.classList.remove("hide-modal");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hide-modal");
  modal.classList.remove("show-modal");
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.classList.add("hide-modal");
    modal.classList.remove("show-modal");
  }
});

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
  let isBooleanSet = completedValue === "true";

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
  const title = document.createElement("h3");
  title.innerText = bookObject.title;
  title.classList.add("title");

  const bookAuthorText = document.createElement("p");
  const bookAuthorValue = document.createElement("h4");
  bookAuthorText.innerText = "Author:";
  bookAuthorValue.innerText = bookObject.author;

  const bookYearText = document.createElement("p");
  const bookYearValue = document.createElement("h4");
  bookYearText.innerText = "Year:";
  bookYearValue.innerText = bookObject.year;

  const descContentContainer_author = document.createElement("div");
  const descContentContainer_year = document.createElement("div");

  descContentContainer_author.classList.add("desc-content");
  descContentContainer_year.classList.add("desc-content");

  descContentContainer_author.append(bookAuthorText, bookAuthorValue);
  descContentContainer_year.append(bookYearText, bookYearValue);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description");
  descriptionContainer.append(descContentContainer_author, descContentContainer_year);

  const cardShowContainer = document.createElement("div");
  cardShowContainer.classList.add("card-show");
  cardShowContainer.append(title, descriptionContainer);

  // button wrapper
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons");

  // delete book global variable
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn-delete");
  deleteButton.innerText = "Delete";

  // checking book conditions
  if (bookObject.isComplete) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("btn-mark", "bg-yellow");
    undoButton.innerText = "Undo from completed";

    undoButton.addEventListener("click", function () {
      undoBookFromCompleted(bookObject.id);
    });

    deleteButton.addEventListener("click", function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          removeBook(bookObject.id);
        }
      });
    });

    buttonsContainer.append(deleteButton, undoButton);
    cardShowContainer.append(buttonsContainer);
  } else {
    const completedButton = document.createElement("button");
    completedButton.classList.add("btn-mark");
    completedButton.innerText = "Add to completed";

    completedButton.addEventListener("click", function () {
      addBookToCompleted(bookObject.id);
    });

    deleteButton.addEventListener("click", function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          removeBook(bookObject.id);
        }
      });
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
 * Search Feature
 */

const formSearch = document.getElementById("form-search");
const searchModal = document.querySelector(".search-modal");
const trigger = document.querySelector(".search-trigger");
const closeButton = document.querySelector(".close-button");
const buttonExpand = document.querySelector(".button-expand");

function toggleModal() {
  searchModal.classList.toggle("show-search-modal");
}

function windowOnClick(event) {
  if (event.target === searchModal) {
    toggleModal();
  }
}

formSearch.addEventListener("submit", function(event) {
  event.preventDefault();
});

trigger.addEventListener("click", toggleModal);
buttonExpand.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function searchBook() {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value.toLowerCase();
  const resultTable = document.querySelector("#result-table tbody");

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchValue) || book.author.toLowerCase().includes(searchValue) || book.year.toLowerCase().includes(searchValue);
  });

  resultTable.innerHTML = "";

  for (const book of filteredBooks) {
    const bookRow = document.createElement("tr");
    bookRow.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.year}</td>
    <td>${book.isComplete ? "Completed" : "Not Completed"}</td>`;

    resultTable.append(bookRow);
  }

  if (filteredBooks.length === 0) {
    resultTable.innerHTML = `<tr><td colspan="4" style="text-align: center;">Data tidak ditemukan</td></tr>`;
  }
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", searchBook);

function showAllData() {
  const resultTable = document.querySelector("#result-table tbody");
  resultTable.innerHTML = "";

  for (const book of books) {
    const bookRow = document.createElement("tr");
    bookRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.isComplete ? "Complete" : "Not Complete"}</td>
    `;
    resultTable.append(bookRow);
  }
}

trigger.addEventListener("click", showAllData);

/**
 * All Event Listener
 *
 */

document.addEventListener("DOMContentLoaded", function () {
  const myForm = document.getElementById("myForm");

  myForm.addEventListener("submit", function (event) {
    event.preventDefault();

    addBookList();
    myForm.reset();
  });

  if (isWebStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(CUSTOM_RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById("not-finished");
  const completedBookList = document.getElementById("finished");

  if (books.length < 1) {
    console.log("the data is empty");
  }

  // console.log(books);

  uncompletedBookList.innerText = "";
  completedBookList.innerText = "";

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
  Swal.fire("Successfully!", "You make a change. Good Job👌🏼", "success");
});
