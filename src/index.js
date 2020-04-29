//√fetch all dogs
//√ append dogs to DOM as table row
//√ add event listener (click) to edit button
    //√should populate the form with the dogs information
//√ "patch" request to update dogs info
//√update dogs info on the DOM


document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    buttonFunctionality()
})
const dogTable = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')

const fetchDogs = () => {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogsData => sortData(dogsData))
};

const sortData = (dogsArray) => {
    dogsArray.forEach(dog => displayDogs(dog))
};

const displayDogs = (dog) => {
    dogTable.innerHTML += `
    <tr>
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button data-id=${dog.id} class="edit-btn">Edit</button></td>
    </tr>
    `
};

const buttonFunctionality = () => {
    dogTable.addEventListener('click', (event) => {
        if (event.target.className === 'edit-btn') {
            let pup = event.target.parentElement
            let pupId = event.target.dataset.id
            let pupName = pup.previousElementSibling.previousElementSibling.previousElementSibling.textContent
            let pupBreed = pup.previousElementSibling.previousElementSibling.textContent
            let pupSex = pup.previousElementSibling.textContent
            
            autoFillForm(pupId, pupName, pupBreed, pupSex)
        }
    })
};

const autoFillForm = (pupId, pupName, pupBreed, pupSex) => {
    dogForm.name.value = pupName
    dogForm.breed.value = pupBreed
    dogForm.sex.value = pupSex

    editDog(pupId)
};

const editDog = (pupId) => {
    dogForm.addEventListener('submit', (event) => {
        const name = dogForm.name.value
        const breed = dogForm.breed.value
        const sex = dogForm.sex.value

        fetch(`http://localhost:3000/dogs/${pupId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                breed: breed,
                sex: sex
            })
        })
        fetchDogs()
    })
};

