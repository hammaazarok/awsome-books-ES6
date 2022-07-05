import { StorageAvailable } from './modules/storageAvailable.js';
import { AwesomeBooks } from './modules/awsomeBooks.js';
import { Book } from './modules/book.js';
import { newDatetime } from './modules/dataTime.js';

const addButton = document.querySelector('.add-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const booksContainer = document.getElementById('books-container');
const removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
const awesomeBooks = new AwesomeBooks(booksContainer, removeButtons);

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
date.innerHTML = newDatetime;

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