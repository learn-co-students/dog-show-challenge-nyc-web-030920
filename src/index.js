document.addEventListener('DOMContentLoaded', () => {
    renderDogList();
    editDog();
})

function renderDogList() {
    const baseUrl = 'http://localhost:3000/dogs';
    fetch(baseUrl)
        .then(res => res.json())
        .then(function (dogs) {
            dogs.forEach(function (dog) {
                showDogTable(dog);
            })
        })
}

function showDogTable(dog) {
    const dogTable = document.querySelector('table');
    let tr = document.createElement('tr')
    tr.dataset.dogId = dog['id'];
    tr.innerHTML = `
    <td>${dog['name']}</td>
    <td>${dog['breed']}</td>
    <td>${dog['sex']}</td>
    <td><button>Edit Dog</button></td>
    `
    dogTable.append(tr);
}

//1. populate the info to form
//2. make a patch to database .../:id
//3. get info from database .../id
//4. reset the form at the end
function editDog() {
    const dogTable = document.querySelector('table');
    const dogForm = document.querySelector('#dog-form');
    dogTable.addEventListener('click', function (event) {
        let eventTarget = event.target;
        if (eventTarget.tagName === 'BUTTON') {
            let tr = eventTarget.parentElement.parentElement;
            populateForm(tr, dogForm);
            updateDog(tr, dogForm);
        }
    })
}

function populateForm(tr, form) {
    let dogInfo = tr.children;
    form.name.value = dogInfo[0].textContent;
    form.breed.value = dogInfo[1].textContent;
    form.sex.value = dogInfo[2].textContent;
}

function updateDog(tr, form) {
    let id = tr.dataset.dogId;
    let trContent = tr.children;
    const url = `http://localhost:3000/dogs/${id}`;
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        let newObj = {
            'name': form.name.value,
            'breed': form.breed.value,
            'sex': form.sex.value
        }
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(newObj)
        })
            .then(res => res.json())
            .then(function (result) {
                trContent[0].textContent = result['name'];
                trContent[1].textContent = result['breed'];
                trContent[2].textContent = result['sex'];
            })

        form.reset();
    })
}