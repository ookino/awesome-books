const books =
  localStorage.getItem('books') !== null
    ? JSON.parse(localStorage.getItem('books'))
    : [];

const form = document.getElementById('add-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add-btn');
let inputtedAuthor = '';
let inputtedTitle = '';

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
