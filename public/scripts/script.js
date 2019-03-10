// dynamic search
const searchBox = document.getElementById('search');
searchBox.addEventListener('keyup', e => {
  const searchTerm = e.target.value.toLowerCase();
  const tableRows = document.querySelectorAll('.table tbody tr');
  tableRows.forEach(row => {
    const children = row.childNodes;
    let match = false;
    children.forEach(child => {
      if (child.textContent.toLowerCase().includes(searchTerm)) {
        match = true;
      }
    });
    if (match) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});