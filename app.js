// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  // console.log(book);
  const list = document.getElementById("book-list");
  // create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function(msg, className) {
  // create a div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert - insert alert div before form
  container.insertBefore(div, form);

  // Set timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event listener to add book
document.querySelector("#book-form").addEventListener("submit", function(e) {
  console.log("test");
  // Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  // Instantiate a book
  const book = new Book(title, author, isbn);
  // console.log(book);

  // Instantiate UI
  const ui = new UI();
  // console.log(ui);

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Success alert
    ui.showAlert('Book added!', 'success');

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener to delete book
document.getElementById('book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
