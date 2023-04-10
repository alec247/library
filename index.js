const myLibrary = [];
let displayBooks = function () {};

// Constructor for books
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    addBookToLibrary() {
        if (bookExists(this.title)) {
            alert("This book is already in the library!");
            return;
        }

        const newBook = new Book(
            this.title,
            this.author,
            this.pages,
            this.read
        );

        myLibrary.push(newBook);
    }
}

function bookExists(newTitle) {
    let value = false;

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === newTitle) {
            value = true;
            break;
        }
    }

    return value;
}

// Creates book object and adds to array if unique

function clearDisplay() {
    document.querySelector(".container").innerHTML = "";
}

function translateBool(bool) {
    if (bool) return "Yes";
    return "No";
}

function toggleRead(event) {
    const index = event.target.dataset.id;

    myLibrary[index].read = !myLibrary[index].read;

    displayBooks(myLibrary);
}

function addToggleReadFunction() {
    const buttons = document.querySelectorAll(".toggle-read");

    buttons.forEach((btn) => {
        btn.addEventListener("click", toggleRead);
    });
}

function removeBook(event) {
    const index = event.target.dataset.id;

    myLibrary.splice(index, index + 1);

    displayBooks(myLibrary);
}

function addRemoveBtnFunction() {
    const buttons = document.querySelectorAll(".remove-book");

    buttons.forEach((btn) => {
        btn.addEventListener("click", removeBook);
    });
}

// Takes myLibrary and iterates through, adds books to cards in display
displayBooks = (library) => {
    const container = document.querySelector(".container");

    clearDisplay();

    library.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `<h2>${book.title}</h2>
            <h4>By: ${book.author}</h4>
            <p>${book.pages} pages</p>
            <p>Have I read it: ${translateBool(book.read)}</p>
            <button class="toggle-read" data-id=${index}>Toggle Read Status</button>
            <button class="remove-book" data-id=${index}>Remove from Library</button>`;

        container.appendChild(card);
    });

    addToggleReadFunction();
    addRemoveBtnFunction();
};

function getForm() {
    return document.getElementById("new-book-form");
}

function toggleForm(event) {
    const form = getForm();
    const elements = Array.from(form.children);

    elements.forEach((element) => {
        element.hidden = !element.hidden;
    });

    event.preventDefault();
}

(function addNewButtonFunction() {
    const btn = document.getElementById("new-book-button");

    btn.addEventListener("click", toggleForm);
})();

function clearForm() {
    const form = getForm();

    form.reset();
}

function getFormValue(attr) {
    const element = document.getElementById(attr);

    if (element.type === "checkbox") {
        return element.checked;
    }

    const { value } = element;
    return value;
}

function submitForm(event) {
    const title = getFormValue("title");
    const author = getFormValue("author");
    const pages = getFormValue("pages");
    const isRead = getFormValue("isRead");

    const newBook = new Book(title, author, pages, isRead);
    newBook.addBookToLibrary();
    console.log(myLibrary);
    displayBooks(myLibrary);

    clearForm();
    event.preventDefault();
}

(function addSubmitButtonFunction() {
    const btn = document.getElementById("form-submit");

    btn.addEventListener("click", toggleForm);
    btn.addEventListener("click", submitForm);
})();
