const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add-btn');
let inputtedAuthor = '';
let inputtedTitle = '';

class Book {
  constructor(title, author, bookId) {
    this.title = title;
    this.author = author;
    this.bookId = bookId;
  }

  addBook = (title, author, bookId) => {
    const newBook = new Book(title, author, bookId);
    const ls =
      localStorage.getItem('books') !== null
        ? JSON.parse(localStorage.getItem('books'))
        : [];
    ls.unshift(newBook);
    localStorage.setItem('books', JSON.stringify(ls));
    console.log(localStorage);
  };

  removeBook = (bookId) => {
    const ls = JSON.parse(localStorage.getItem('books'));
    const removed = ls.filter((book) => book.bookId != bookId);
    localStorage.setItem('books', JSON.stringify(removed));
    console.log(localStorage);
  };

  displayBooks = () => {
    if (localStorage.getItem('books') !== null) {
      const lsBooks = JSON.parse(localStorage.getItem('books'));
      lsBooks.forEach((element) => {
        const li = document.createElement('li');
        const pTitle = document.createElement('p');
        const pAuthor = document.createElement('p');
        const removeBook = document.createElement('button');
        li.setAttribute('class', 'book-li');
        pTitle.setAttribute('class', 'book-title');
        pAuthor.setAttribute('class', 'book-author');
        removeBook.setAttribute('onclick', `removeBook('${element.bookId}')`);
        pTitle.innerHTML = `${element.title}`;
        pAuthor.innerHTML = `${element.author}`;
        removeBook.innerHTML = 'Remove';
        li.innerHTML +=
          pTitle.outerHTML + pAuthor.outerHTML + removeBook.outerHTML;
        document.querySelector('.books-ul').appendChild(li);
      });
    }
  };
}

title.addEventListener('input', (e) => {
  inputtedTitle = e.target.value;
});

author.addEventListener('input', (e) => {
  inputtedAuthor = e.target.value;
});

addBtn.addEventListener('click', () => {
  const newBook = { title: inputtedTitle, author: inputtedAuthor };
  books.unshift(newBook);
  localStorage.setItem('books', JSON.stringify(books));
});

// eslint-disable-next-line no-unused-vars
const removeBook = (bookTitle) => {
  const filtered = books.filter((book) => book.title !== bookTitle);
  localStorage.setItem('books', JSON.stringify(filtered));
  window.location.reload();
};

books.forEach((element) => {
  const li = document.createElement('li');
  const pTitle = document.createElement('p');
  const pAuthor = document.createElement('p');
  const addBook = document.createElement('button');
  li.setAttribute('class', 'book-li');
  pTitle.setAttribute('class', 'book-title');
  pAuthor.setAttribute('class', 'book-author');
  addBook.setAttribute('onclick', `removeBook('${element.title}')`);
  pTitle.innerHTML = `${element.title}`;
  pAuthor.innerHTML = `${element.author}`;
  addBook.innerHTML = 'Remove';
  li.innerHTML += pTitle.outerHTML + pAuthor.outerHTML + addBook.outerHTML;
  document.querySelector('.books-ul').appendChild(li);
});
