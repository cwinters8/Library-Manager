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
  if (matched.length > 0) {
    clearNoResults();
    paginate(matched);
  } else {
    hideAll();
  }
});

/**
 * SORT
 */
// get the right field from the row
function getField(fieldName, parentRow) {
  const fields = parentRow.children;
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].className === fieldName) {
      return fields[i];
    }
  }
}

// sort based on class name match
function sort(className, order) {
  const fieldName = className.match(/^sort-(\w+)$/)[1];
  const booksArray = Array.from(tableRows);
  // sort by the given field name
  const sorted = booksArray.sort((a, b) => {
    const fieldA = getField(fieldName, a);
    const fieldB = getField(fieldName, b);
    if (order === 'asc') {
      return fieldA.innerText < fieldB.innerText ? -1 : 1;
    } else {
      return fieldA.innerText > fieldB.innerText ? -1 : 1;
    }
  });
  const tbody = document.querySelector('tbody');
  // TO-DO: This whole section needs to be fixed. Only currently displayed values should be sorted.
  // empty tbody
  tbody.innerHTML = '';
  // replace with sorted rows
  sorted.forEach(row => {
    tbody.append(row);
  });
  paginate(sorted);
}

// event listeners for each sort button
document.querySelectorAll('a.sort').forEach(sortLink => {
  sortLink.addEventListener('click', e => {
    e.preventDefault();
    const classList = sortLink.classList;
    const fieldClass = classList[1];
    const fieldName = fieldClass.match(/^sort-(\w+)$/)[1];
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
  });
})