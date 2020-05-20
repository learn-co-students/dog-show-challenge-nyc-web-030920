const dogUrl = 'http://localhost:3000/dogs'
const dogTable = document.querySelector(".table-body")
console.log(dogTable)
document.addEventListener("DOMContentLoaded", e => {
    fetchDogs()
})

const fetchDogs = () => {
    fetch(dogUrl)
    .then(res => res.json())
    .then(renderDogs)
}

const renderDogs = (dogs) => {
    dogs.forEach(dog => {
        const dogTr = document.createElement("tr")
        dogTr.dataset.id = dog.id
        dogTr.className = "dog"
        dogTr.innerHTML = `
        <td>${dog.name}</td> <td>*${dog.breed}*</td> <td>*${dog.sex}*</td> <td><button>Edit</button></td>
        `
        // console.log(dogTr)
        // dogTable.appendchild(dogTr)
    })
}