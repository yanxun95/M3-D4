let books = [];
let booksInCartList = [];

const row = document.querySelector('.row')
const cart = document.querySelector('.cart-list')

window.onload = () => {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then(receivedBooks => {
            books = receivedBooks
            displayBooks(receivedBooks)
        })
        .catch(err => {
            console.log(err)
        })
}



function displayBooks(books) {
    row.innerHTML = books.map((book, i) => `
                    <div class="card">
                        <div class="img-container">
                            <img src="${book.img}" class="card-img-top" alt="..." />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" onClick="bookDetails(event, ${i})" data-toggle="modal" data-target="#exampleModal">${book.title}</h5>
                            <p class="card-text">
                                Price: ${book.price}
                            </p>
                            <a href="#" class="btn btn-primary btnAdd" onClick="btnAdd(event, ${i})">add to cart</a>
                            <a href="#" class="btn btn-primary btnEdit" onClick="btnSkip(event)">skip</a>
                        </div>
                    </div>
            `).join("")
}

const btnAdd = (event, n) => {
    const currentCard = event.target.closest(".card")
    currentCard.classList.add("book-in-cart");
    booksInCartList.push(books[n]);
    bookINChat(booksInCartList);

}

const btnSkip = (event) => {
    event.target.closest(".card").remove();
}

function filterBooks(query) {
    // displayBooks(books.filter(b => b.title.includes(query)))        
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
    )

    query.length > 3 ? displayBooks(filteredBooks)
        : query.length == 0 ? displayBooks(filteredBooks)
            : alert("Search value must be more than 3 words!")
}

const bookINChat = (books) => {
    cart.innerHTML = books.map((book, i) => `
                    <div class="card card-cart">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">
                                Price: ${book.price}
                            </p>
                            <a href="#" class="btn btn-primary" onClick="btnDeleteBookCart(event)">remove</a>
                        </div>
                    </div>
            `).join("")
}

const btnDeleteBookCart = (event) => {
    event.target.closest(".card").remove();
    let x = event.target.closest(".card").innerHTML
    console.log(x)
}

const removeAll = () => {
    cart.innerHTML = ""
    booksInCartList = [];
}

const bookDetails = (event, n) => {
    const url = event.target.closest(".card").children[0].src
    const title = document.querySelector('.modal-title')
    title.innerHTML = books[n].title
    image = `<img src="${url}"/>`

    const body = document.querySelector('.modal-body')
    body.innerHTML = `<img src="${books[n].img}"/> Price: ${books[n].price}`
}