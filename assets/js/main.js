var request = new XMLHttpRequest()
var data =[]
var links = document.querySelectorAll(".nav-link")
var loading = document.querySelector('.loading')

for(var i=0;i<links.length;i++){
    links[i].onclick = function(e){
        getData(e.target.innerText)
    }
}
function getData(type){
    request.open("get",`https://forkify-api.herokuapp.com/api/search?q=${type}`)
request.send()
request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
        data = JSON.parse(request.response).recipes;
        displayData()
        loading.style.opacity='0';
        loading.style.visibility = 'hidden'
        loading.style.transition='1s'
        document.body.style.overflow='auto';
    }else{
        loading.style.opacity='1';
        loading.style.visibility = 'visible'
        loading.style.transition='1s'
        document.body.style.overflow='hidden';
    }
}
}
getData("pizza");

function displayData() {
    var content = ``;
    for (var i = 0; i < data.length; i++) {
        content += `
        <div class="col-md-4 d-flex py-3">
            <div class="card flex-md-row h-md-100">
                <img src="${data[i].image_url}" class="card-img-top" alt="${data[i].title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data[i].title}</h5>
                    <p class="card-text">${data[i].publisher}</p>
                    <a href="details.html?id=${data[i].recipe_id}" class="btn btn-primary mt-auto">Show Recipe Details</a>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("content").innerHTML = content;
}




