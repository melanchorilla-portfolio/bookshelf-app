const STORAGE_KEY = "BOOKSHELF_APPS";
const UNCOMPLETED_READ = "incompleteBookshelfList";
const COMPLETED_READ = "completeBookshelfList";
const BOOK_ID = "bookId";

let books = [];

function isStorageExist() {
    if(typeof(Storage) === undefined) {
        alert("Browser tidak mendukung local storage");
        return false;
    }

    return true;
}

function saveData() {
    const parsedToJson = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsedToJson);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let dataObject = JSON.parse(serializedData);

    if(dataObject !== null) books = dataObject;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist()) saveData();
}

function composeBookObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
}

function findBook(bookId) {
    for (book of books) {
        if(book.id === bookId) return book;
    }

    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of books) {
        if(book.id === bookId) return index;

        index++;

    }
    
    return -1;
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_READ);
    const listCompleted = document.getElementById(COMPLETED_READ);

    for (book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.isComplete);
        newBook[BOOK_ID] = book.id;

        if(book.isComplete) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}

function makeBook(title, author, year, isComplete) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("author");
    textAuthor.innerHTML = "Penulis: <span>" + author + "</span>";

    const textYear = document.createElement("p");
    textYear.classList.add("year");
    textYear.innerHTML = "Tahun: <span>" + year + "</span>";

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement("article");
    container.classList.add("book_item")
    container.append(textContainer);
    
    if (isComplete) {
        container.append(
            createIncompleteButton(),
            createDeleteButton()
        );

    } else {
        container.append(
            createCompleteButton(), 
            createDeleteButton()
        );
    }
    return container;
}

function createIncompleteButton() {
    return createButton("green", "Belum selesai dibaca", function(event) {
        addBookToIncomplete(event.target.parentElement);
    });
}

function createCompleteButton() {
    return createButton("green", "Selesai dibaca", function(event) {
        addBookToComplete(event.target.parentElement);
    });
}

function createDeleteButton() {
    return createButton("red", "Hapus buku", function(event) {
        deleteBook(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, textButton, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    
    return button;
}


function addBookToIncomplete(bookElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_READ);
    const bookTitle = bookElement.querySelector(".inner > h3").innerText;
    const bookAuthor = bookElement.querySelector(".inner > p.author > span").innerText;
    const bookYear = bookElement.querySelector(".inner > p.year > span").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(bookElement[BOOK_ID]);
    book.isComplete = false;
    newBook[BOOK_ID] = book.id;

    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function addBookToComplete(bookElement){
    const listCompleted = document.getElementById(COMPLETED_READ);
    const bookTitle = bookElement.querySelector(".inner > h3").innerText;
    const bookAuthor = bookElement.querySelector(".inner > p.author > span").innerText;
    const bookYear = bookElement.querySelector(".inner > p.year  > span").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ID]);
    book.isComplete = true;
    newBook[BOOK_ID] = book.id;

    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function deleteBook(bookElement) {
    var modal = document.getElementById("myModal");
    var cancelBtn = document.getElementById("cancelBtn");
    var deleteBtn = document.getElementById("deleteBtn");

    modal.style.display = "block";
    deleteBtn.addEventListener("click", function () {
        modal.style.display = "none";

        const bookPosition = findBookIndex(bookElement[BOOK_ID]);
        books.splice(bookPosition,1);
        bookElement.remove();
        updateDataToStorage();
    })

    cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
    })

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function addBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_READ);
    const completedBookList = document.getElementById(COMPLETED_READ);

    const titleValue = document.getElementById("inputBookTitle").value;
    const authorValue = document.getElementById("inputBookAuthor").value;
    const yearValue = document.getElementById("inputBookYear").value;
    const isCompleteValue = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(titleValue, authorValue, yearValue, isCompleteValue);
    const bookObject = composeBookObject(titleValue, authorValue, yearValue, isCompleteValue);

    if(isCompleteValue) {
        book[BOOK_ID] = bookObject.id;
        books.push(bookObject);

        completedBookList.append(book);
    } else {
        book[BOOK_ID] = bookObject.id;
        books.push(bookObject);

        uncompletedBookList.append(book);
    }

    updateDataToStorage();

}


document.addEventListener("DOMContentLoaded", function() {
    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    })

    if(isStorageExist()){
        loadDataFromStorage();
    }

})

document.addEventListener("ondatasaved", () => {
   console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
   refreshDataFromBooks();
});

