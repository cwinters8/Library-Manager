const tableRows = document.querySelectorAll('.table tbody tr');

// TO-DO: Need to sort across pages
  // Capture elements that were hidden due to search
  // Show all elements
  // Sort
  // Re-hide previously hidden elements and paginate again

/**
 * SORT
 */
// event listeners for each sort button
document.querySelectorAll('a.sort').forEach(sortLink => {
  sortLink.addEventListener('click', e => {
    e.preventDefault();
    const classList = sortLink.classList;
    const fieldClass = classList[1];
    const fieldName = fieldClass.match(/^sort-(\w+)$/)[1];
    // capture the rows that were hidden from search
    const searchHidden = document.querySelectorAll('.search-hidden');
    showAll();
    // if the class list already has asc, then sort desc, and vice versa
    if (classList.contains('asc')) {
      tinysort('tbody tr', {selector: `td.${fieldName}`, order: 'desc'});
      classList.remove('asc', 'desc');
      classList.add('desc');
    } else {
      tinysort('tbody tr', {selector: `td.${fieldName}`});
      classList.remove('asc', 'desc');
      classList.add('asc');
    }
    // re-hide previously hidden elements from search
    searchHidden.forEach(book => {
      book.style.display = 'none';
    });
    // paginate shown elements
    paginate(document.querySelectorAll('tbody tr:not([style*="display: none"])'));
  });
});

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
    // unhide all books, unless search-hidden
    if (!book.classList.contains('search-hidden')) {
      book.style.display = '';
    }
    // hide all books except if it's in the given list
    if (!books.includes(book)) {
      book.style.display = 'none';
    }
  });
}

// clear pagination links
function clearPageLinks() {
  document.querySelector('ul.pagination').innerHTML = '';
}

// clear no results message
function clearNoResults() {
  const noResults = document.querySelector('.no-results');
  if (noResults) {
    document.querySelector('body').removeChild(noResults);
  }
}

// show all books
function showAll() {
  tableRows.forEach(book => {
    book.style.display = '';
  })
}

// hide all books
function hideAll() {
  tableRows.forEach(book => {
    book.style.display = 'none';
  });
  clearPageLinks();
  // add 'no results found' message
  clearNoResults();
  const noResults = document.createElement('div');
  noResults.classList.add('no-results', 'row', 'column', 'justify-content-center');
  noResults.innerHTML = '<h2>No Results Found</h2>';
  document.querySelector('table').after(noResults);
}

// main function to add pagination
function paginate(arrayOfBooks) {
  const books = buildArray(arrayOfBooks);
  // clear links
  clearPageLinks();
  // append page links
  books.forEach((array, index) => {
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
      li.classList.add('active');
      // show current array
      showPage(array);
    });
  });
  // select first page by default, if it exists
  const pageItem = document.querySelector('.page-item');
  if (pageItem) {
    pageItem.click();
  }
}

paginate(tableRows);

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
    book.classList.remove('search-hidden');
    let match = false;
    children.forEach(child => {
      if (child.textContent.toLowerCase().includes(searchTerm)) {
        match = true;
      }
    });
    if (match) {
      matched.push(book);
    } else {
      book.classList.add('search-hidden');
    }
  });
  if (matched.length > 0) {
    clearNoResults();
    paginate(matched);
  } else {
    hideAll();
  }
});
