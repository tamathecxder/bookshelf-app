// button check
const btnChecker = document.querySelectorAll('.button-checker');
console.log(btnChecker);

// dapatkan element Modal
const modal = document.getElementById('myModalElement');

// dapatkan button untuk membuka Modal
const button = document.getElementById('myModalButton')

// dapatkan <span> yang fungsinya nanti untuk penutup dari element modal
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


// NAV AND TABS
function openTabs(evt, sectionName) {
  var i, tabcontent, tablinks;
  const sectionTarget = document.getElementById(sectionName);
  
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
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


