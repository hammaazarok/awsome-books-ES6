class AwesomeBooks {
  constructor(booksContainer, removeButtons) {
    this.books = [];
    this.dataFromStorage = [];
    this.booksContainer = booksContainer;
    this.removeButtons = removeButtons;
  }

    addBooktoHTML = (title, author, id) => {
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
      this.booksContainer.appendChild(bookHTML);
    }

removeBookFromHTML = () => {
  this.removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
  this.removeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      this.booksContainer.removeChild(btn.parentElement);
      this.books = this.books.filter((book, index) => index !== this.removeButtons.indexOf(btn));
      localStorage.setItem('BooksDataItem', JSON.stringify(this.books));
      this.removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
    });
  });
}
}

export default AwesomeBooks;
export { AwesomeBooks };