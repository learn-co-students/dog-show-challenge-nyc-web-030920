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
        <td name="name" data-id="${dog.id}">${dog.name}</td> 
        <td name="breed">${dog.breed}</td> 
        <td name="sex">${dog.sex}</td> 
        <td><button>Edit</button></td>
        `
        dogTable.appendChild(dogRow)
    }

    dogTable.addEventListener("click", function(e){
        if (e.target.textContent === "Edit"){
            const nameField = editForm.children[0]
            const breedField = editForm.children[1]
            const sexField = editForm.children[2]

            const dogRow = e.target.parentNode.parentNode

            nameField.value = dogRow.children[0].textContent
            breedField.value = dogRow.children[1].textContent
            sexField.value = dogRow.children[2].textContent
        }
    })

    editForm.addEventListener("submit", function(e){
        // √√listen for submit and stop default action
        // get dog id
        // make ptch request to dog id and update info in API
        // make get request to get new dog table information AFTER PATCH
        e.preventDefault()
        
        


        fetch(`http://localhost:3000/pups/${id}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify()
            })
            .then(response => response.json())
            .then(json => console.log(json))

        console.log("stopped the submit")
    })


//!END OF THE DOM LISTENER
})