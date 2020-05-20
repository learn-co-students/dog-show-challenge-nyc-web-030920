const dogUrl = 'http://localhost:3000/dogs'
const table = document.querySelector("#table-body")
const form = document.getElementById("dog-form")
let dogFormName = form.name
let dogFormBreed = form.breed
let dogFormSex = form.sex


document.addEventListener("DOMContentLoaded", e => {
    fetchDogs()
    handleClick()
})

const fetchDogs = () => {
    fetch(dogUrl)
    .then(res => res.json())
    .then(renderDogs)
}

const renderDogs = (dogs) => {
    table.innerHTML = ""
    dogs.forEach(dog => {
        const dogTr = document.createElement("tr")
        dogTr.dataset.id = dog.id
        dogTr.className = "dog"
        dogTr.innerHTML = `
        <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> 
        `
        const td = document.createElement("td")
        const dogButton = document.createElement("button")
        dogButton.className = "dog-button"
        dogButton.innerText = "Edit"
        td.appendChild(dogButton)
        dogTr.appendChild(td)
        // console.log(dogTr)
        table.appendChild(dogTr)
    })
}

const handleClick = () => {
    document.addEventListener("click", event => {
        if(event.target.className === "dog-button"){
            const dogsTr = event.target.parentElement
            const parentElement = dogsTr.parentElement

            dogFormName.value = parentElement.children[0].innerText
            dogFormBreed.value = parentElement.children[1].innerText
            dogFormSex.value = parentElement.children[2].innerText
            
            document.addEventListener("submit", e => {
                e.preventDefault()
                const name = e.target.name.value
                const breed = e.target.breed.value
                const sex = e.target.sex.value
                const id = parentElement.dataset.id
                fetch(`http://localhost:3000/dogs/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        name: name,
                        breed: breed,
                        sex: sex
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(resp => resp.json())
                .then(fetchDogs)
            })
        
        }
    })
}



 