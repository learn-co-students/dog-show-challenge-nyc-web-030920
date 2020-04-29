// add event listener on submit form
// submit patch request to update dog information -- need to test
// reload page

// when we call updateDog, need to pass in ID variable

const newHeaders = {
    'Content-Type': 'application/json'
  }

const dogsUrl = 'http://localhost:3000/dogs'
let dogId

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body')
    getDogs()
    
    tableBody.addEventListener('click', function(event) {
        if (event.target.className === 'button') {
            dogId = (event.target.parentElement.parentElement.getAttribute('data-id'))
            let row = event.target.parentElement.parentElement
            let cells = row.getElementsByTagName('td')
            loadDog(cells[0].innerText, cells[1].innerText, cells[2].innerText)
        }
    })

    
    
})

function getDogs () {
    // get dogs and iterate thru array of objects    
    fetch(dogsUrl)
    .then(response => response.json())
    .then(dogs => dogs.forEach(dog => newDog(dog)))
}

function newDog(doggie) {
    // create each table row w/info
    const tableBody = document.getElementById('table-body')
    
    let dogRow = document.createElement('tr')
    dogRow.dataset.id = doggie.id
    dogRow.innerHTML = `
        <td>${doggie.name}</td>
        <td>${doggie.breed}</td>
        <td>${doggie.sex}</td>
        <td><button class="button" id="edit-button">Edit Dog</button></td>
    `
    tableBody.appendChild(dogRow)
}

function loadDog(doggie) {
    const editForm = document.querySelector('#dog-form')
    editForm.name.value = name
    editForm.breed.value = breed
    editForm.sex.value = sex
}

function updateDog(doggie) {

    fetch(dogsUrl + `/${dogId}`, {
        method: 'PATCH',
        body: JSON.stringify(doggie),
        headers: newHeaders
    })
        .then(response => response.json())
        .then(console.log)


}
