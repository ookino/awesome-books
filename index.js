const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add-btn');
let inputtedAuthor = '';
let inputtedTitle = '';
const list = document.querySelector('.list-books');
const add = document.querySelector('.add-book');
const contact = document.querySelector('.contact');
const logo = document.getElementById('logo');
const addLink = document.getElementById('add');
const listLink = document.getElementById('list');
const contactLink = document.getElementById('contact');

const listPage = () => {
  list.classList.remove('hidden');
  add.classList.add('hidden');
  contact.classList.add('hidden');
};

const addPage = (e) => {
  e.preventDefault();
  add.classList.remove('hidden');
  list.classList.add('hidden');
  contact.classList.add('hidden');
};

const contactPage = (e) => {
  e.preventDefault();
  contact.classList.remove('hidden');
  add.classList.add('hidden');
  list.classList.add('hidden');
};
class Book {
  constructor(title, author, bookId, emoji) {
    this.title = title;
    this.author = author;
    this.bookId = bookId;
    this.emoji = emoji;
  }

  addBook = (title, author, bookId, emoji) => {
    const newBook = new Book(title, author, bookId, emoji);
    const ls =
      localStorage.getItem('books') !== null
        ? JSON.parse(localStorage.getItem('books'))
        : [];
    ls.unshift(newBook);
    localStorage.setItem('books', JSON.stringify(ls));
  };

  removeBook = (bookId) => {
    console.log(bookId);
    const ls = JSON.parse(localStorage.getItem('books'));
    console.log(ls);
    const removed = ls.filter((book) => book.bookId !== bookId);
    console.log(removed);
    localStorage.setItem('books', JSON.stringify(removed));
    console.log(localStorage);
    window.location.reload();
  };

  displayBooks = () => {
    listPage();
    if (localStorage.getItem('books') !== null) {
      const lsBooks = JSON.parse(localStorage.getItem('books'));
      lsBooks.forEach((element) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const pEmoji = document.createElement('span');
        const pTitle = document.createElement('p');
        const removeBook = document.createElement('button');
        li.setAttribute('class', 'book-li');
        div.setAttribute('class', 'book-div');
        pEmoji.setAttribute('class', 'book-emoji');
        pTitle.setAttribute('class', 'book-title');
        removeBook.setAttribute('onclick', `removeBook(${element.bookId})`);
        pEmoji.innerHTML = `${element.emoji}`;
        pTitle.innerHTML =
          `${element.title}` +
          `<span class="book-author"> by ${element.author}</span>`;

        removeBook.innerHTML = 'REMOVE';
        div.innerHTML += pEmoji.outerHTML + pTitle.outerHTML;
        li.innerHTML += div.outerHTML + removeBook.outerHTML;
        document.querySelector('.books-ul').appendChild(li);
      });
    }
  };
}

const changeEmoji = () => {
  const emojiArray = [
    '&#128212',
    '&#128213',
    '&#128215',
    '&#128216',
    '&#128217',
  ];
  const random = emojiArray[Math.floor(Math.random() * emojiArray.length)];
  return random;
};

const booksData = new Book();

/** Remove Book * */
// eslint-disable-next-line no-unused-vars
const removeBook = (id) => {
  booksData.removeBook(id);
};

/** Add Book * */
title.addEventListener('input', (e) => {
  inputtedTitle = e.target.value;
});

author.addEventListener('input', (e) => {
  inputtedAuthor = e.target.value;
});

addBtn.addEventListener('click', () => {
  const newEmoji = changeEmoji();
  const generatedId = Math.floor(Math.random() * 10000);
  booksData.addBook(inputtedTitle, inputtedAuthor, generatedId, newEmoji);
});

/** display Book * */
window.addEventListener('load', booksData.displayBooks());

/** SPA Listners * */
addLink.addEventListener('click', addPage);
listLink.addEventListener('click', listPage);
contactLink.addEventListener('click', contactPage);
logo.addEventListener('click', listPage);
