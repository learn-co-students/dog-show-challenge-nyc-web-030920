// √ render dogs from DB
// √ listener on edit button to prefill edit form
// √ patch to save edit to dog in DB
// √ THEN update table without refresh 


baseURL = "http://localhost:3000/dogs"
document.addEventListener('DOMContentLoaded', () => {

populateTable()

const table = document.querySelector("#table-body")
const form = document.querySelector("#dog-form")

document.addEventListener("click", function(e){
    e.preventDefault();
    if (e.target.textContent === "Edit"){
            let dog = e.target.parentNode.parentNode.parentNode

            // set the form values to the dog we want to edit
            form.dataset.id = dog.dataset.id
           form.name.value = dog.querySelector("#dog-name").innerText
           form.breed.value = dog.querySelector("#dog-breed").innerText
           form.sex.value = dog.querySelector("#dog-sex").innerText
        } // end of "If click is on edit button"

     else if (e.target.type === "submit"){
            let dogID = form.dataset.id
            let dogName = form.name.value
            let dogBreed = form.breed.value
            let dogSex = form.sex.value

            fetch(`${baseURL}/${dogID}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: dogName, breed: dogBreed, sex: dogSex})
              })
              .then(event => {
                form.reset()
                table.innerHTML = ''
                populateTable()
              }) // end of Then statement
              
        } // end of "if click is submit"

}) // end of listener 

function populateTable() {
fetch(baseURL)
.then(response => response.json())
.then(dogs => {
    dogs.forEach(dog => {
        renderDog(dog)
    })

}); // end of fetch 

} // end of populate table function


function renderDog(dog) {
    let tr = document.createElement('tr')
    tr.dataset.id = dog.id
    tr.innerHTML = `
    <td id="dog-name" >${dog.name}</td> 
    <td id="dog-breed" >${dog.breed}</td> 
    <td id="dog-sex" >${dog.sex}</td> 
    <td><center><button>Edit</button></center></td>
    `
    table.append(tr)
} //end of render dog function


}) // end of DOM loaded

