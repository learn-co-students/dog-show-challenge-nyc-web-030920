let dogUrl = `http://localhost:3000/dogs`
let tableContainer = document.getElementById('table-body')
let dogID

document.addEventListener('DOMContentLoaded', () => {
    // I M P O R T  D O G S
    fetch(dogUrl)
        .then(resp => resp.json())
        .then(array => array.forEach(element => {
            addToTable(element)
        }))

    let submitButton = document.getElementById('dog-form') // FORM 
    submitButton.addEventListener('submit', event => {
        event.preventDefault()
        let dogNode = document.querySelector(`tr[data-id="${dogID}"]`)
        dogNode.innerHTML = ''
        console.log(dogNode)
        fetch(`${dogUrl}/${dogID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                breed: event.target.breed.value,
                sex: event.target.sex.value
            })
        }).then(resp => resp.json())
            .then(hash => {
                console.log(hash)
                dogNode.innerHTML =
                    `<td>${hash.name}</td> 
                    <td>${hash.breed}</td> 
                    <td>${hash.sex}</td> 
                    <td>
                        <button>Edit</button>
                    </td>`
            })
    })

})

function addToTable(hash) {
    let tr = document.createElement('tr')
    tr.dataset.id = hash.id
    tr.innerHTML =
        `<td>${hash.name}</td> 
    <td>${hash.breed}</td> 
    <td>${hash.sex}</td> 
    <td>
        <button>Edit</button>
    </td>`

    tableContainer.appendChild(tr)
    let editButton = tr.querySelector('button') // went to parent to get button for each element 
    let nameNode = tr.querySelector('td')

    editButton.addEventListener('click', event => {
        nameInput = document.querySelector(`input[name=name]`)
        BreedInput = document.querySelector('input[name=breed]')
        sexInput = document.querySelector('input[name=sex]')
        dogID = tr.dataset.id

        nameInput.value = nameNode.innerText // Hit a road block here
        BreedInput.value = hash.breed
        sexInput.value = hash.sex
    })
}