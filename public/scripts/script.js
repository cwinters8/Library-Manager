const tableRows = document.querySelectorAll('.table tbody tr');

/**
 * PAGINATION
 */
// create an array of arrays, with 10 elements each
function buildArray(books) {
  const parentArray = [];
  books.forEach((book, index) => {
    const parentLength = parentArray.length;
    let currentArrayIndex = (parentLength > 0) ? parentLength - 1 : 0;
    if (index % 10 === 0 && index != 0) {
      currentArrayIndex++;
    }
    if (!parentArray[currentArrayIndex]) {
      parentArray[currentArrayIndex] = [];
    }
    parentArray[currentArrayIndex].push(book);
  });
  return parentArray;
}

// show a given list of books
function showPage(books) {
  tableRows.forEach(book => {
    // unhide all books
    book.style.display = '';
    // hide all books except if it's in the given list
    if (!books.includes(book)) {
      book.style.display = 'none';
    }
  });
}

// main function to add pagination
function paginate(arrayOfBooks) {
  // clear links
  document.querySelector('ul.pagination').innerHTML = '';
  // append page links
  arrayOfBooks.forEach((array, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<a class="page-link" href="#">${index + 1}</a>`;
    li.className = 'page-item';
    document.querySelector('.pagination').append(li);
    // add a listener to each item
    li.addEventListener('click', e => {
      e.preventDefault();
      // remove active class from other links
      document.querySelectorAll('.pagination li').forEach(item => {
        item.className = 'page-item';
      })
      // add active class to this link
      li.classList += ' active';
      // show current array
      showPage(array);
    });
  });
  // select first page by default
  document.querySelector('.page-item').click();
}

paginate(buildArray(tableRows));

/**
 * DYNAMIC SEARCH
 */
const searchBox = document.getElementById('search');
searchBox.addEventListener('keyup', e => {
  const searchTerm = e.target.value.toLowerCase();
  const books = document.querySelectorAll('.table tbody tr');
  const matched = [];
  books.forEach(book => {
    const children = book.childNodes;
    let match = false;
    children.forEach(child => {
      if (child.textContent.toLowerCase().includes(searchTerm)) {
        match = true;
      }
    });
    if (match) {
      matched.push(book);
    }
  });
  paginate(buildArray(matched));
});