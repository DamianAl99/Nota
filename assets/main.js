'use strict'
var divPresentation = document.querySelector(".content-presentation");
let divTasks = document.querySelector(".content-tasks");
let nombre = document.querySelector("#nombre");
let formNombre = document.querySelector("#formNombre");
let titleTasks = document.querySelector(".titleTasks");

let inputTasks = document.querySelector("#inputTask");
let formTasks = document.querySelector("#formTasks");

let nombreSaved = "";

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

nombreSaved = localStorage.getItem("nombreA");
console.log(nombreSaved)

/*es la presentacion del div tareas BIENVENIDOS NOMBRE*/
if(nombreSaved != null){
    divPresentation.style.display = "none";
    divTasks.style.display = "grid";
    let nombrePresentation = `Bienvenido ${nombreSaved.toUpperCase()}`;
    titleTasks.append(nombrePresentation);
}else{
    console.log("no hay nada en el localStorage");
};


/*es para guardar las tareas*/
let tasks = [];
formTasks.addEventListener("submit", function(){ 
    if(inputTasks.value == ""){
        alert("Ingresa una Tarea Valida pelotudo");
    }else{
        if (localStorage.getItem("tasks")===null){
            tasks.push(inputTasks.value);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            inputTasks.value = "";
            inputTasks.focus();
        }else{
            tasks = JSON.parse(localStorage.getItem("tasks"));
            //se trae del localstorage para volver a guardar u posteriormente volver a subir
            tasks.push(inputTasks.value);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            inputTasks.focus();
        }; 
    }
     
});


/*es para obtener las tareas*/
function getTasks(){
    let listTask = document.querySelector(".tareas");
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    listTask.innerHTML = "";
    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i];
        console.log(i)
        listTask.innerHTML += `<li>
            <p id="title${i}">${title}</p><button class="btn-red" onclick="deleteForm('${title}')">X</button><button class="btn-red" onclick="through('${i}')">*</button>
        </li>
        `;
    };
    inputTasks.focus();
    //localStorage.getItem("through");
};

getTasks();

function deleteForm(ii){
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
});


function through(ii){
    /*let tasks = JSON.parse(localStorage.getItem(`tasks`));
    let sub;
    sub = tasks[ii];
    console.log(sub);*/
    //let p = document.createElement('p');
   // p.innerHTML = sub;
    
    //p.innerHTML = sub;
    let p = document.querySelector(`#title${ii}`);
    p.classList.toggle("through");

    localStorage.setItem("through", JSON.stringify(p.classList.value));
    let localthr = JSON.parse(localStorage.getItem("through"));
    console.log(localthr);
    let localtrh = p.classList.value;
    if(localtrh === "through"){
        localStorage.setItem("through", JSON.stringify(p.classList.value));
        p.classList.value = localtrh;
        console.log(p)
    }else{
        localStorage.setItem("through", JSON.stringify(p.classList.value));
        p.classList.value = '';
        console.log(p)
    }


    
    /*let tasks = JSON.parse(localStorage.getItem(`tasks`));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i] == ii){
            //tasks[i].classList.toggle("through");
            //tasks[i].style.background = "red";
            console.log(ii);
            let p = ii;
            let a = JSON.stringify(p);
            console.log(a);
            p.style.cssText = 'background: red;';
        };
    };*/
};








/*for(let valor of re){
    let listTask = document.querySelector(".lis");
    let parrafo = `${valor} <button class="btn-green">Hecho</button><button class="btn-red">Eliminar</button>`;
    let parrafo = `${re[i]} <button class="btn-green">Hecho</button><button class="btn-red">Eliminar</button>`;
}*/







