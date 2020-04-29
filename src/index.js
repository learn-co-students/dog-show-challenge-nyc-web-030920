document.addEventListener('DOMContentLoaded', () => {
    console.log("The DOM is loaded!")


    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(json => json.forEach(loadDog))
    

    const dogTable = document.querySelector("table")
    const editForm = document.querySelector("form")

    function loadDog(dog){
        const dogRow = document.createElement("tr")
        dogRow.innerHTML= `
        <td name="name">${dog.name}</td> 
        <td name="breed">${dog.breed}</td> 
        <td name="sex">${dog.sex}</td> 
        <td><button id="edit-btn" data-id="${dog.id}">Edit</button></td>
        `
        dogRow.dataset.id = dog.id
        dogTable.appendChild(dogRow)
    }

    dogTable.addEventListener("click", function(e){
        if (e.target.textContent === "Edit"){
            const id = e.target.dataset.id
            // console.log(e.target.dataset.id)
            fetch(`http://localhost:3000/dogs/${id}`)
                .then(response => response.json())
                .then(dog => {
                    editForm.name.value = dog.name,
                    editForm.sex.value = dog.sex,
                    editForm.breed.value = dog.breed,
                    editForm.dataset.id = dog.id
                })
        }
    })

    editForm.addEventListener("submit", function(e){
        // √√listen for submit and stop default action
        // get dog id
        // make ptch request to dog id and update info in API
        // make get request to get new dog table information AFTER PATCH
        e.preventDefault()
        console.log(e.target)
        console.log("stopped the submit")
    })


//!END OF THE DOM LISTENER
})