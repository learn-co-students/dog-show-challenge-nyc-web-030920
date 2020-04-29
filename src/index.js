// add event listener for edit button
// load dog info into form
// submit patch request to update dog information
// reload page



const dogsUrl = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.querySelector('#edit-button')

    getDogs()

    editBtn.addEventListener('click', function(event) {

        

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
        <td><button id="edit-button">Edit Dog</button></td>
    `
    tableBody.appendChild(dogRow)
}

