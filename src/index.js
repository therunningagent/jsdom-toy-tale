let addToy = false;

/* Variables */

const url = 'http://localhost:3000/toys/'
const toyCollectionDiv = document.querySelector("#toy-collection")
const newToyForm = document.querySelector('.add-toy-form')

/* EVENT LISTENERS */

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  newToyForm.addEventListener('submit', function (event) {
    event.preventDefault()

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: event.target.name.value,
        image: event.target.image.value,
        likes: 0
      }),
    })
      .then(response => response.json())
      .then(newToyData => {
        renderNewToy(newToyData);
      })
  })

  toyCollectionDiv.addEventListener('click', function (event) {

    if (event.target.matches('.like-btn')) {

      const cardDiv = event.target.closest('.card')
      const id = cardDiv.dataset.id

      const pTag = cardDiv.querySelector('p')

      fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: parseInt(pTag.textContent) + 1
        })
      })
        .then(response => response.json())
        .then(updatedToyObject => {
          console.log(updatedToyObject)
          pTag.textContent = `${updatedToyObject.likes} Likes`
        })

    }
  })

  /* FUNCTIONS */

  function initialize() {
    fetch(url)
      .then(response => response.json())
      .then(toys => {
        toys.forEach(function (toyObject) {
          renderNewToy(toyObject)
        })
      });
  }

  function renderNewToy(toyObject) {

    /* create elements */

    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    const p = document.createElement("p")
    const button = document.createElement("button")

    /* attach attributes */

    div.classList.add("card")
    div.dataset.id = toyObject.id
    h2.textContent = toyObject.name
    img.src = toyObject.image
    img.classList.add("toy-avatar")
    p.textContent = toyObject.likes + " likes"
    button.textContent = "Like <3"
    button.classList.add("like-btn")

    /* append */

    div.append(h2, img, p, button)
    toyCollectionDiv.append(div)

  }

  /* initialize */

  initialize()

});

