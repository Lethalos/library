let myLibrary = [];

function Book(title, author, numOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
  this.info = function () {
    if (this.isRead) {
      return `The ${this.title} by ${this.author}, ${this.numOfPages} pages, read`;
    } else {
      return `The ${this.title} by ${this.author}, ${this.numOfPages} pages, not read yet`;
    }
  };
}

const theHobbit = new Book("Hobbit", "JRR", 295, true);
const atomicHabits = new Book("Atomic Habits", "James Clear", 567, false);
console.log(theHobbit.info());
console.log(atomicHabits.info());

addBookToLibrary(theHobbit);
addBookToLibrary(atomicHabits);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    console.log(book.title);
  });
}

displayLibrary();
