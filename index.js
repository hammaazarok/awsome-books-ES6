class StorageAvailable {
  constructor(type) {
    this.type = type;
    this.storage = window[this.type];
  }

  try() {
    const x = '__storage_test__';
    this.storage.setItem(x, x);
    this.storage.removeItem(x);
    return true;
  }

  catch(e) {
    return e instanceof DOMException && (
      e.code === 22

      || e.code === 1014

      || e.name === 'QuotaExceededError'

      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')

      && (this.storage && this.storage.length !== 0);
  }
}
const addButton = document.querySelector('.add-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const booksContainer = document.getElementById('books-container');
let removeButtons = Array.from(document.querySelectorAll('.remove-btn'));

class AwesomeBooks {
  constructor() {
    this.books = [];
    this.dataFromStorage = [];
  }

  addBooktoHTML(title, author, id) {
    const bookHTML = document.createElement('div');
    bookHTML.classList.add('book');
    if (id % 2 === 0) {
      bookHTML.classList.add('gray');
    }
    bookHTML.innerHTML = `
          <p class="title">"${title}" By</p>
          <p class="author">${author}</p>
          <button class="remove-btn">remove</button>
      `;
    booksContainer.appendChild(bookHTML);
  }

  removeBookFromHTML() {
    removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
    removeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        booksContainer.removeChild(btn.parentElement);
        this.books = this.books.filter((book, index) => index !== removeButtons.indexOf(btn));
        localStorage.setItem('BooksDataItem', JSON.stringify(this.books));
        removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
      });
    });
  }
}

const awesomeBooks = new AwesomeBooks();

if (new StorageAvailable('localStorage')) {
  awesomeBooks.dataFromStorage = JSON.parse(localStorage.getItem('BooksDataItem'));

  if (awesomeBooks.dataFromStorage !== null) {
    awesomeBooks.books = awesomeBooks.dataFromStorage;
    awesomeBooks.dataFromStorage.forEach((book, index) => {
      awesomeBooks.addBooktoHTML(book.title, book.author, index);
      awesomeBooks.removeBookFromHTML();
    });
  }
} else {
  awesomeBooks.dataFromStorage = [];
  awesomeBooks.books = awesomeBooks.dataFromStorage;
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

addButton.addEventListener('click', () => {
  const titleInputValue = title.value;
  const authorInputValue = author.value;
  if (titleInputValue !== '' && authorInputValue !== '') {
    const newBook = new Book(titleInputValue, authorInputValue);
    awesomeBooks.books.push(newBook);
    const index = awesomeBooks.books.length - 1;
    awesomeBooks.addBooktoHTML(titleInputValue, authorInputValue, index);
    localStorage.setItem('BooksDataItem', JSON.stringify(awesomeBooks.books));
    awesomeBooks.removeBookFromHTML();
  }
});

const date = document.querySelector('.date');
date.innerHTML = new Date();

const bookList = document.querySelector('.list');
const addBook = document.querySelector('.add');
const contactInfo = document.querySelector('.contact');

const navLink = document.querySelectorAll('.nav-link');
navLink.forEach((n, index) => n.addEventListener('click', () => {
  navLink.forEach((link, number) => {
    if (index === number) {
      link.classList.add('bgcolor');
    } else {
      link.classList.remove('bgcolor');
    }
  });
  if (index === 0) {
    bookList.classList.remove('hide');
    addBook.classList.add('hide');
    contactInfo.classList.add('hide');
  } else if (index === 1) {
    bookList.classList.add('hide');
    addBook.classList.remove('hide');
    contactInfo.classList.add('hide');
  } else {
    bookList.classList.add('hide');
    addBook.classList.add('hide');
    contactInfo.classList.remove('hide');
  }
}));