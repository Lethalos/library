let myBooks = [];
let myLibrary = [];

class Book {
  constructor(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.info = function (isRead) {
      if (isRead) {
        return `The ${this.title} by ${this.author}, ${this.numOfPages} pages, read`;
      } else {
        return `The ${this.title} by ${this.author}, ${this.numOfPages} pages, not read yet`;
      }
    };
  }
}

const theHobbit = new Book("Hobbit", "J.R.R. Tolkien", 304, true);
const atomicHabits = new Book("Atomic Habits", "James Clear", 320, false);

// Book object to HTML string
function createBookHTML(book) {
  let bookHTML = "";
  if (book.isRead) {
    bookHTML = `
    <div class="card">
      <div class="interaction-buttons">
        <div class="delete-btn">&times;</div>
      </div>
      <div class="book-title">${book.title}</div>
      <div class="info-text">Infos</div>
      <div class="author">Author: ${book.author}</div>
      <div class="page-number">Number of pages: ${book.numOfPages}</div>
      <div class="is-read">${book.info(book.isRead)}</div>
      <button class="read-toggle-button">Not Read</button>
    </div>
  `;
  } else {
    bookHTML = `
    <div class="card not-read">
      <div class="interaction-buttons">
        <div class="delete-btn">&times;</div>
      </div>
      <div class="book-title">${book.title}</div>
      <div class="info-text">Infos</div>
      <div class="author">Author: ${book.author}</div>
      <div class="page-number">Number of pages: ${book.numOfPages}</div>
      <div class="is-read">${book.info(book.isRead)}</div>
      <button class="read-toggle-button not-read">Read</button>
    </div>`;
  }

  return bookHTML;
}

function addBookToLibrary(book) {
  const bookHTML = createBookHTML(book);

  myBooks.push(book);
  myLibrary.push(bookHTML);
}

function deleteBookFromLibrary(index) {
  myBooks.splice(index, 1);
  myLibrary.splice(index, 1);
  displayLibrary();
}

// Handles toggle button
function toggleBookIsRead(index) {
  myBooks[index].isRead = !myBooks[index].isRead;
  myBooks[index].info(myBooks[index].isRead);
  myLibrary[index] = createBookHTML(myBooks[index]);
  displayLibrary();
}

function displayLibrary() {
  let books = document.querySelector(".books");

  books.innerHTML = "";
  myLibrary.forEach((bookHTML) => {
    books.innerHTML += bookHTML;
  });

  const bookDeleteButtons = document.querySelectorAll(".delete-btn");

  for (let i = 0; i < bookDeleteButtons.length; i++) {
    bookDeleteButtons[i].addEventListener("click", () => {
      deleteBookFromLibrary(i);
    });
  }

  const readToggleButtons = document.querySelectorAll(".read-toggle-button");

  for (let i = 0; i < readToggleButtons.length; i++) {
    readToggleButtons[i].addEventListener("click", () => {
      toggleBookIsRead(i);
    });
  }
}

addBookToLibrary(theHobbit);
addBookToLibrary(atomicHabits);
displayLibrary();

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const bookTitleInput = document.getElementById("book-title");
const authorInput = document.getElementById("author");
const pageInput = document.getElementById("page");
const readInput = document.getElementById("read");
const submitBtn = document.querySelector(".submit-btn");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function resetForm() {
  bookTitleInput.value = "";
  authorInput.value = "";
  pageInput.value = "";
  readInput.checked = true;
}

submitBtn.addEventListener("click", (e) => {
  let isRead = readInput.checked;
  if (
    bookTitleInput.value == false ||
    authorInput.value == false ||
    pageInput.value == false
  ) {
    return;
  }
  const newBook = new Book(
    bookTitleInput.value,
    authorInput.value,
    pageInput.value,
    isRead
  );

  addBookToLibrary(newBook);
  displayLibrary();

  // Close modal and reset
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
  resetForm();

  e.preventDefault();
});
