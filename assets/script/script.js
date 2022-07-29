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
// console.log(btnChecker);






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


