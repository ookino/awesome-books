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
