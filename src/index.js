let dogUrl = `http://localhost:3000/dogs`
let tableContainer = document.getElementById('table-body')

document.addEventListener('DOMContentLoaded', () => {
    // I M P O R T  D O G S
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(array => array.forEach(element =>{
        addToTable(element)
    }))
    
    let submitButton = document.querySelector('input[type=submit]')
    submitButton.addEventListener('click', event =>{
        event.preventDefault()
        // fetch(`http://localhost:3000/dogs/(HOW DO I GET THIS ID)`)
        
    })
})

function addToTable(hash){
    let tr = document.createElement('tr')
    tr.innerHTML = `<td id=${hash.id}>${hash.name}</td> <td>${hash.breed}</td> <td>${hash.sex}</td> <td><button>Edit</button></td>`
    tableContainer.appendChild(tr)

    let editButton = tr.querySelector('button') // went to paren to get button for each element 
    editButton.addEventListener('click',event => {
        nameInput = document.querySelector(`input[name=name]`)
        BreedInput = document.querySelector('input[name=breed]')
        sexInput = document.querySelector('input[name=sex]')
        
        nameInput.value = hash.name
        BreedInput.value = hash.breed
        sexInput.value = hash.sex
    })
}

