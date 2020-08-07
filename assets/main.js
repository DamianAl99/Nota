'use strict'
var divPresentation = document.querySelector(".content-presentation");
let divTasks = document.querySelector(".content-tasks");
let nombre = document.querySelector("#nombre");
let formNombre = document.querySelector("#formNombre");
let titleTasks = document.querySelector(".titleTasks");

let inputTasks = document.querySelector("#inputTask");
let formTasks = document.querySelector("#formTasks");

let nombreSaved = "";

nombreSaved = localStorage.getItem("nombreA");

/*es la presentacion del div tareas BIENVENIDOS NOMBRE*/
if(nombreSaved != null){
    divPresentation.style.display = "none";
    divTasks.style.display = "grid";
    let nombrePresentation = `Bienvenido ${nombreSaved.toUpperCase()}`;
    titleTasks.append(nombrePresentation);
}else{
    console.log("no hay nada en el localStorage");
};


/*es para guardar el nombre para la bienvenida*/
formNombre.addEventListener("submit", function(){
    //localStorage.setItem("nombre", nombre);

    if(nombre.value){
        localStorage.setItem("nombreA", nombre.value);
        nombre.value = "";
    }else{
        alert("ingresa un nombre valido");
        return false;
    };
});


/*es para guardar las tareas*/
let tasks = [];
formTasks.addEventListener("submit", function(){ 
    if (localStorage.getItem("tasks")===null){
        tasks.push(inputTasks.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        inputTasks.value = "";
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(inputTasks.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };  
});


/*es para obtener las tareas*/
function getTasks(){
    let listTask = document.querySelector(".tareas");
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    listTask.innerHTML = "";
    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i];
        listTask.innerHTML += `<li>
            <p class="title">${title}</p><button class="btn-red" onclick="through('${title}')">X</button>
        </li>
        `;
        
    };
};

getTasks();

function through(ii){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i] == ii){
            //tasks[i].classList.toggle("through");
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getTasks();
        
};

let btnUsuario = document.querySelector("#btn-usuario");
console.log(btnUsuario);
btnUsuario.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})









/*for(let valor of re){
    let listTask = document.querySelector(".lis");
    let parrafo = `${valor} <button class="btn-green">Hecho</button><button class="btn-red">Eliminar</button>`;
    let parrafo = `${re[i]} <button class="btn-green">Hecho</button><button class="btn-red">Eliminar</button>`;
}*/







