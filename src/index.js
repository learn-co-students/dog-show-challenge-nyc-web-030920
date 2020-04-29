document.addEventListener('DOMContentLoaded', () => {
  tableBody = document.getElementById('table-body')
  form = document.getElementById('dog-form')
  const formNameField = form[0]
  const formBreedField = form[1]
  const formSexField = form[2]

  getData()

  let dogId;
  
  document.addEventListener('click', event => {
    if (event.target.className === 'edit-dog-btn') {
      dogId = event.target.dataset.id

      let dogSex = event.target.parentNode.previousSibling
      let dogSexValue = dogSex.innerText

      let dogBreed = dogSex.previousSibling
      let dogBreedValue = dogBreed.innerText

      let dogName = dogBreed.previousSibling
      let dogNameValue = dogBreed.previousSibling.innerText

      
      formNameField.value = dogNameValue
      formBreedField.value = dogBreedValue
      formSexField.value = dogSexValue
    }
  })

  form.addEventListener('submit', event => {
    event.preventDefault()

    let nameInput = form[0].value
    let breedInput = form[1].value
    let sexInput = form[2].value 

    
    fetch(`${endpoint}/${dogId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        name: nameInput,
        breed: breedInput,
        sex: sexInput
      })
    })
    .then(resp => resp.json())
    .then(updateRender)
  })
})

function updateRender(dogObj) {
  let dogObjId = dogObj.id

  let btn = document.querySelector(`button[data-id="${dogObjId}"]`)
  let sex = btn.parentNode.previousSibling
  let breed = sex.previousSibling
  let name = breed.previousSibling

  sex.innerText = dogObj.sex
  breed.innerText = dogObj.breed
  name.innerText = dogObj.name 

  form.reset()
}

const endpoint = 'http://localhost:3000/dogs'

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

function getData() {
  fetch(endpoint)
  .then(resp => resp.json())
  .then(json => json.forEach(creatDogHTML))
}

let tableBody;
let form;

function creatDogHTML(dogObj) {
  let tr = document.createElement('tr')

  let tdName= document.createElement('td')
  tdName.innerText = dogObj.name 

  let tdBreed = document.createElement('td')
  tdBreed.innerText = dogObj.breed 

  let tdSex = document.createElement('td')
  tdSex.innerText = dogObj.sex

  let tdEdit = document.createElement('td')
  let editBtn = document.createElement('button')
  editBtn.innerText = 'Edit Dog'
  editBtn.dataset.id = dogObj.id
  editBtn.className = 'edit-dog-btn'
  tdEdit.append(editBtn)

  tr.append(tdName, tdBreed, tdSex, tdEdit)
  tableBody.append(tr)

} 
