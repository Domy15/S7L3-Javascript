const url = "https://striveschool-api.herokuapp.com/books";
const row = document.querySelector(".row");
const remove = document.querySelectorAll("a");
let books;

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

getData();

function createCards() {
    for (let i = 0; i < books.length; i++) {
        row.innerHTML += `<div class="col-3 card">
  <img src="${books[i].img}" class="card-img-top" height="400em">
  <div class="card-body">
    <h5 class="card-title">${books[i].title}</h5>
    <p class="card-text">${books[i].price}</p>
    <p class="card-text">${books[i].category}</p>
    <a href="JavaScript:void(0)" class="btn btn-primary">Scarta</a>
  </div>
</div>`
    };
    const remove = document.querySelectorAll("a");
    for (let i = 0; i < books.length; i++) {
        remove[i].addEventListener('click', function() {
            books.splice(i,1);
            row.innerHTML = "";
            createCards();
        });
    };
}