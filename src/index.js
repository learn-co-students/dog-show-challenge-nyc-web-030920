document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector("#table-body")
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
        let tr = document.createElement('tr')
        tr.dataset.dogId = dog['id'];
        tr.innerHTML = `
        <td>${dog['name']}</td>
        <td>${dog['breed']}</td>
        <td>${dog['sex']}</td>
        <td><button>Edit Dog</button></td>
        `
        tableBody.append(tr);
    }
    
    //1. populate the info to form
    //2. make a patch to database .../:id
    //3. get info from database .../id
    //4. reset the form at the end
    function editDog() {
        const dogForm = document.querySelector('#dog-form');
        tableBody.addEventListener('click', function (event) {
            let eventTarget = event.target;
            if (eventTarget.tagName === 'BUTTON') {
                let tr = eventTarget.parentElement.parentElement;
                populateForm(tr, dogForm);
            }
        })
    }
    
    function populateForm(tr, form) {
        let dogInfo = tr.children;
        form.name.value = dogInfo[0].textContent;
        form.breed.value = dogInfo[1].textContent;
        form.sex.value = dogInfo[2].textContent;
        form.dataset.id = tr.dataset.dogId;
    }

    document.addEventListener('submit', function(event){
        event.preventDefault()
        const form = document.querySelector('#dog-form');
        let target = event.target;
        const url = `http://localhost:3000/dogs/${target.dataset.id}`;
        let trContent = document.querySelector(`tr[data-dog-id="${target.dataset.id}"]`)
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
            trContent.children[0].textContent = result['name'];
            trContent.children[1].textContent = result['breed'];
            trContent.children[2].textContent = result['sex'];
        })
        form.reset();
    })
    
    renderDogList();
    editDog();
})
