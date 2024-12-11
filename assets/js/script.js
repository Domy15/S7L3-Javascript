const url = "https://striveschool-api.herokuapp.com/books";
const row = document.querySelector(".row");
const remove = document.querySelectorAll("a");
let books;
const cart = document.getElementById("cart");
const ul = document.getElementById("cartUl");
let storageBooks = JSON.parse(localStorage.getItem("book")) || [];

document.addEventListener("load", init());

function init() {
    getData();
    createCart2(); 
}

async function getData() {
    await fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        books = data;
        createCards();
    }).catch((error) => {
        console.log(error);
    });
}

function createCards() {
    for (let i = 0; i < books.length; i++) {
        row.innerHTML += `<div class="col-3 card">
  <img src="${books[i].img}" class="card-img-top" style="height: 400px">
  <div class="card-body">
    <h5 class="card-title">${books[i].title}</h5>
    <p class="card-text">${books[i].price}</p>
    <p class="card-text">${books[i].category}</p>
    <a href="JavaScript:void(0)" class="btn btn-success buy">Compra ora</a>
    <a href="JavaScript:void(0)" class="btn btn-primary remove">Scarta</a>
  </div>
</div>`
    };
    createRemove();
    createCart();
}

function createRemove() {
    const remove = document.querySelectorAll(".remove");
    for (let i = 0; i < books.length; i++) {
        remove[i].addEventListener('click', function () {
            books.splice(i, 1);
            row.innerHTML = "";
            createCards();
        });
    };
}

function createCart() {
    const buy = document.querySelectorAll(".buy");
    for (let i = 0; i < books.length; i++) {
        buy[i].addEventListener("click", function () {
            storageBooks.push({
                title: books[i].title,
                price: books[i].price
            }); 
            createCart2();
            localStorage.setItem("book", JSON.stringify(storageBooks));
        });
    };
}

function createCart2() {
    ul.innerText = "";
    for (let j = 0; j < storageBooks.length; j++) {
        let li = document.createElement("li");
        let btnCart = document.createElement("button");
        li.innerText = `${storageBooks[j].title}, ${storageBooks[j].price}€`;
        btnCart.innerHTML = "❌";
        btnCart.addEventListener("click", function() {storageBooks.splice(j,1); createCart2();});
        li.appendChild(btnCart);
        ul.appendChild(li);
    };
}