let dogUrl = `http://localhost:3000/dogs`
let tableContainer = document.getElementById('table-body')

document.addEventListener('DOMContentLoaded', () => {
    // I M P O R T  D O G S
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(array => array.forEach(element =>{
        addToTable(element)
    }))
    // why can't i define name node here to get my id??

    let submitButton = document.querySelector('input[type=submit]')
    submitButton.addEventListener('click', event =>{
        event.preventDefault()
        // console.log(`http://localhost:3000/dogs/${hash.id}`)
        
    })
    
})

function addToTable(hash){
    let tr = document.createElement('tr')
    tr.innerHTML = `<td id=${hash.id}>${hash.name}</td> <td>${hash.breed}</td> <td>${hash.sex}</td> <td><button>Edit</button></td>`
    tableContainer.appendChild(tr)
    let editButton = tr.querySelector('button') // went to parent to get button for each element 
    let nameNode = tr.querySelector('td')

    editButton.addEventListener('click',event => {
        nameInput = document.querySelector(`input[name=name]`)
        BreedInput = document.querySelector('input[name=breed]')
        sexInput = document.querySelector('input[name=sex]')

        nameInput.value = nameNode.innerText // Hit a road block here
        BreedInput.value = hash.breed
        sexInput.value = hash.sex
    })
}

