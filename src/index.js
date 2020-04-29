document.addEventListener('DOMContentLoaded', () => {
    renderDogList();
    editDog();
})

function renderDogList(){
    const baseUrl = 'http://localhost:3000/dogs';
    fetch(baseUrl)
    .then(res => res.json())
    .then(function(dogs){
        dogs.forEach(function(dog){
            showDogTable(dog);
        })
    })
}

function showDogTable(dog){
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

function editDog(){
    
}