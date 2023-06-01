var queryString = window.location.search;
var parms = new URLSearchParams(queryString);
var id = parms.get("id");
var data ={};
var httpRequest = new XMLHttpRequest();
var ingredients =[]
var loading = document.querySelector('.loading')
getDetails(id);
function getDetails(id){
    httpRequest.open('GET',`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    httpRequest.send()
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState ==4 && httpRequest.status ==200){
            data = JSON.parse(httpRequest.response).recipe
            ingredients = data.ingredients
            display();
            displayIngredients();
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

function display(){
    document.getElementById("content").innerHTML=`
    <div class="row">
            <div class="col-md-7">
                <h2>${data.title}</h2>
                <img src="${data.image_url}" alt="">
            </div>
            <div class="col-md-5">
                <h3>${data.publisher}</h3>
                <p>Recipe ingredients</p>
                <div id="ingredients"></div>
                <a class="btn btn-info" href="${data.publisher_url}">Publisher URl</a>
            </div>
        </div>
    `
}

function displayIngredients(){
    for(var i=0;i<ingredients.length;i++){
        var ele = document.createElement('p')
        ele.innerText=ingredients[i];
        document.getElementById("ingredients").append(ele);
    }
}

