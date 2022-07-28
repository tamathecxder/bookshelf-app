console.log('Hello, World');

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