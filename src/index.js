document.addEventListener('DOMContentLoaded', () => {
    getDog()

});
//================================================
function getDog() {
fetch('http://localhost:3000/dogs')
	.then((resp) => resp.json())
	.then((dogs) => {
        let table = document.getElementById('table-body')
        dogs.forEach(function(dog){
        let tr = document.createElement('tr')
        tr.dataset.id = dog.id
        tr.innerHTML = `
			<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td>
			<td>
				<button class='editBtn'>Edit</button>
			</td>
        `
        table.appendChild(tr)
       })
    editBtn()

    });

 }
 //============================================================
function editBtn(){
    //let btn = document.getElementsByTagName('button')
    document.addEventListener('click', function(e){
        if(e.target.className == 'editBtn'){
        //console.log(e.target.parentNode.parentNode.children[2].innerText)
         let form = document.getElementById('dog-form')
        // form.addEventListener('submit',function(){

        let name = form.name.value = e.target.parentNode.parentNode.children[0].innerText
        let breed = form.breed.value=e.target.parentNode.parentNode.children[1].innerText
        let sex = form.sex.value = e.target.parentNode.parentNode.children[2].innerText
        //})

        let id = e.target.parentNode.parentNode.dataset.id
        let table = document.getElementById('table-body')


        form.addEventListener('submit', function(e){
            e.preventDefault()
            let newName = e.target.name.value
            let newBreed = e.target.breed.value
            let newSex = e.target.sex.value
        fetch(`http://localhost:3000/dogs/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
                name:newName,
                breed:newBreed,
                sex:newSex
            })
        })
        .then((resp)=>resp.json())
        .then((dog)=> {
        //let tr = document.getElementsByTagName('tr')
        let tr = document.createElement('tr')
        tr.innerHTML = `
			<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td>
			
        `
       table.appendChild(tr)
        })

         })

        }
   

    })
}
