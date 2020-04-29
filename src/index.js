document.addEventListener('DOMContentLoaded', () => {
    getDog()
    editBtn()
});
//================================================
function getDog() {
 fetch('http://localhost:3000/dogs')
	.then((resp) => resp.json())
	.then((dogs) => {
        let table = document.getElementById('table-body')
        table.innerHTML = ''
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
   

    });

 }
 //============================================================
function editBtn(){
    //let btn = document.getElementsByTagName('button')
    document.addEventListener('click', function(e){
        if(e.target.className == 'editBtn'){
            let id = e.target.parentNode.parentNode.dataset.id

        //console.log(e.target.parentNode.parentNode.children[2].innerText)
         let form = document.getElementById('dog-form')
        // form.addEventListener('submit',function(){
       form.dataset.id = id
       form.name.value = e.target.parentNode.parentNode.children[0].innerText
       form.breed.value=e.target.parentNode.parentNode.children[1].innerText
       form.sex.value = e.target.parentNode.parentNode.children[2].innerText
        //})

    }
    let form = document.getElementById('dog-form')

        form.addEventListener('submit', function(e){
            e.preventDefault()
            let id = e.target.dataset.id
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
        .then(getDog)
            
         

         })

       
   

    })
}
