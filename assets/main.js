"use strict";
//contenedor, div del form de presentacion
let divPresentation = document.querySelector(".content-presentation");
//contendor, div donde esta el form para las tareas
const divTasks = document.querySelector(".content-tasks");
//input donde esta el nombre
const inputName = document.querySelector("#nombre");
//donde ira el nombre que se ingreso
const titleTasks = document.querySelector(".titleTasks");
//value del input de la tarea
const inputTask = document.getElementById("inputTask");
//button para guardar el nombre
const btnFormName = document.getElementById("btnNombre");
//button para guardar las tareas
const btnFormTasks = document.getElementById("btnSaveTasks");
//get select values, like low and high
const selectRange = document.getElementById("selectRange");

let dtoTaskSaved = "";
let nameSaved = "";
let logh4 = "";
let logForInputTask = [];
let id = 0;

//guardar el nombre en el local storage
btnFormName.addEventListener("click", (e) => {
  e.preventDefault();
  nameValidation();
  printNameOnScreen();
});
btnFormTasks.addEventListener("click", (e) => {
  e.preventDefault();
  let validationTasks = tasksValidation();
  if (validationTasks == true) {
    saveTasks();
  }
  inputTask.focus();
  inputTask.value = "";
  progressBar();
});

const nameValidation = () => {
  if (
    inputName.value != null &&
    inputName.value != "" &&
    inputName.value.length > 2 &&
    isNaN(inputName.value)
  ) {
    document
      .querySelector(".content-presentation")
      .classList.add("esconderDivPresentacion");
    localStorage.setItem("name", inputName.value);

    messageOfLog("Se registro correctamente", "green");
  } else {
    messageOfLog("Ingresa un nombre correcto", "red");
  }
};
const printNameOnScreen = () => {
  userExist();
};
const userExist = () => {
  nameSaved = localStorage.getItem("name");
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  //console.log(tasks);
  if (nameSaved) {
    if (nameSaved != null && nameSaved != "") {
      document
        .querySelector(".content-presentation")
        .classList.add("esconderDivPresentacion");
      document.querySelector(".content-tasks").style.display = "grid";
      titleTasks.innerHTML = `Hola ${nameSaved.toUpperCase()}! aqui puedes guardar tus tareas.`;
      writeTasks(tasks);
    }
  }
};
const saveTasks = (e) => {
  let tasks = [];
  id = Date.now();
  if (localStorage.getItem("tasks") != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(DTOTasksList(id));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    tasks.push(DTOTasksList(id));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  writeTasks(tasks);
};
let DTOTasksList = (id) => {
  let cont = 0;
  return dtoTaskSaved = {
    id: id,
    task: inputTask.value,
    doIt: false,
    date: new Date(Date.now()).toLocaleDateString(),
    porcentaje: id,
    range: selectRange.options[selectRange.selectedIndex].text
  };
};
const tasksValidation = () => {
  logForInputTask = [
    "No puedes dejar vacio el Input, Ingresa datos correctos",
    "Ingresa mas caracteres para que sea valido - Sera mas facil de entender",
  ];
  if (inputTask.value == "" || inputTask.value == null) {
    messageOfLog(logForInputTask[0], "red");
    return false;
  } else if (inputTask.value.length > 0 && inputTask.value.length < 5) {
    messageOfLog(logForInputTask[1], "red");
    return false;
  } else {
    messageOfLog("Tarea guardada correctamente", "green");
    return true;
  }
};
const messageOfLog = (message, color) => {
  let logMessage = document.querySelector(".log");
  logh4 = `<h4>${message}</h4>`;
  logMessage.innerHTML = logh4;
  if (color == "green") {
    logMessage.classList.remove(`red`);
    logMessage.classList.remove(`yellow`);
    logMessage.classList.add(`${color}`);
  } else if(color == "red"){
    logMessage.classList.remove(`green`);
    logMessage.classList.remove(`yellow`);
    logMessage.classList.add(`${color}`);
  } else{
    logMessage.classList.remove(`green`);
    logMessage.classList.remove(`red`);
    logMessage.classList.add(`${color}`);
  }
  logMessage.style.display = "block";
  setTimeout(function () {
    logMessage.style.display = "none";
  }, 4000);
};
const writeTasks = (tasks) => {
  try {
    let tasksInLi = "";
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        console.log(tasks);
        tasksInLi += `
        <li class="liClass ${tasks[i].doIt == true ? "lineThrought" : ""}">
          ${tasks[i].task} 
          <div class="${tasks[i].range == "Bajo" ? "shadow-yellow" : "shadow-red"}"></div>
          <button class="doItTask" idTaskDoIt = ${tasks[i].id}>Hecho</button>
          <button class="deleteTask" idTask = ${tasks[i].id}>Delete</button>
        </li>
      `;
        document.querySelector(".tareas").innerHTML = tasksInLi;
      }

      //for delete all data en this variable
      if(tasks.length == 0){
        tasksInLi = "";
        document.querySelector(".tareas").innerHTML = tasksInLi;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
//Escucha el evento en este div, y si se toca el btn, extraemos el atributo creado
document.querySelector(".tareas").addEventListener("click", (e) => {
  e.preventDefault();
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  deleteTask(e, tasks);
  doItTask(e, tasks);
});
const deleteTask = (e, tasks) => {
  try {
    //this id is the attribute idTask, we was create in the list html
    let id = e.target.attributes.idTask.textContent;

    //we search the object we want delete in the database
    let taskDeleted;
    taskDeleted = tasks.find((task) => {
      return task.id == id;
    });

    //we search the item we want delete, for use in the splice
    let findIndexTask = tasks.indexOf(taskDeleted);
    if (
      confirm(`Seguro de que quieres eliminar la tarea: ${taskDeleted.task}?`)
    ) {
      tasks.splice(findIndexTask, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      messageOfLog("Se elimino correctamente la nota", "red");
      console.log("llego aqui");
      writeTasks(tasks);
      progressBar();
    }
  } catch (error) {
    //console.log("este es un error controlado:", error)
  }
};
const doItTask = (e, tasks) => {
  try {
    let id = e.target.attributes.idTaskDoIt.textContent;
    let taskDoIt = tasks.find((task) => {
      return task.id == id;
    });
    if(taskDoIt.doIt == false){
      taskDoIt.doIt = true;
      messageOfLog("Excelente, una tarea menos", "green");
    }else{
      taskDoIt.doIt = false;
      messageOfLog("Has descmarcado la tarea", "yellow");
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    writeTasks(tasks);
    progressBar();
  } catch (error) {
    //console.log("este es un error controlado: ", error)
  }
}

document.getElementById("btn-usuario").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
})

const progressBar = () => {
  let countTasks = 0;
  let allTrues;
  let cont;
  let barCSS;
  if(localStorage.getItem("tasks") != null){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    countTasks = tasks.length;
    countTasks = countTasks * 10;

    allTrues = tasks.filter(task => task.doIt == true);
    cont = allTrues.length * 10;
    barCSS = (100*cont)/countTasks;
    let progressBarHtml = document.querySelector(".progressBar");
    progressBarHtml.style.width = `${barCSS}%`;
    if(barCSS <= 40){
      progressBarHtml.style.background = "yellow";
    }else if(barCSS <= 85){
      progressBarHtml.style.background = "orange";
    }else{
      progressBarHtml.style.background = "green";
    }
  }
}

userExist();
progressBar();

//why we have use the stringIf and parse
//Guardar el nombre en el local storage

/*es para guardar el nombre para la bienvenida*/
// formNombre.addEventListener("submit", function(e){
//     e.preventDefault();
//     if(nombre.value){
//         localStorage.setItem("nombreA", nombre.value);
//         nombre.value = "";
//     }else{
//         //cambiar
//         alert("ingresa un nombre valido");
//         return false;
//     };
// });

// nombreSaved = localStorage.getItem("nombreA");
// console.log(nombreSaved)

// /*es la presentacion del div tareas BIENVENIDOS NOMBRE*/
// if(nombreSaved != null){
//     divPresentation.style.display = "none";
//     divTasks.style.display = "grid";
//     let nombrePresentation = `Bienvenido ${nombreSaved.toUpperCase()}`;
//     titleTasks.append(nombrePresentation);
// }else{
//     console.log("no hay nada en el localStorage");
// };

// /*es para guardar las tareas*/
// let tasks = [];
// formTasks.addEventListener("submit", function(e){
//     if(inputTasks.value == ""){
//         //cambiar por un error en un div
//         alert("No puedes agregar una tarea vacia");
//     }else{
//         e.preventDefault();

//     }

// });

// /*es para obtener las tareas*/
// function getTasks(){
//     let listTask = document.querySelector(".tareas");
//     let tasks = JSON.parse(localStorage.getItem("tasks"));

//     listTask.innerHTML = "";
//     for(let i = 0; i < tasks.length; i++){
//         let title = tasks[i];
//         console.log(i)
//         listTask.innerHTML += `<li>
//             <p id="title${i}">${title}</p><button class="btn-red" onclick="deleteForm('${title}')">X</button><button class="btn-red" onclick="through('${i}')">*</button>
//         </li>
//         `;
//     };
//     inputTasks.focus();
//     //localStorage.getItem("through");
// };

// getTasks();

// function deleteForm(ii){
//     let tasks = JSON.parse(localStorage.getItem("tasks"));
//     for(let i = 0; i < tasks.length; i++){
//         if(tasks[i] == ii){
//             //tasks[i].classList.toggle("through");
//             tasks.splice(i, 1);
//         }
//     }
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     getTasks();

// };

// let btnUsuario = document.querySelector("#btn-usuario");
// console.log(btnUsuario);
// btnUsuario.addEventListener("click", function(){
//     localStorage.clear();
//     location.reload();
// });

// function through(ii){
//     /*let tasks = JSON.parse(localStorage.getItem(`tasks`));
//     let sub;
//     sub = tasks[ii];
//     console.log(sub);*/
//     //let p = document.createElement('p');
//    // p.innerHTML = sub;

//     //p.innerHTML = sub;
//     let p = document.querySelector(`#title${ii}`);
//     p.classList.toggle("through");

//     localStorage.setItem("through", JSON.stringify(p.classList.value));
//     let localthr = JSON.parse(localStorage.getItem("through"));
//     console.log(localthr);
//     let localtrh = p.classList.value;
//     if(localtrh === "through"){
//         localStorage.setItem("through", JSON.stringify(p.classList.value));
//         p.classList.value = localtrh;
//         console.log(p)
//     }else{
//         localStorage.setItem("through", JSON.stringify(p.classList.value));
//         p.classList.value = '';
//         console.log(p)
//     }

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
//};

/*for(let valor of re){
    let listTask = document.querySelector(".lis");
    let parrafo = `${valor} <button class="btn-green">Hecho</button><button class="btn-red">Eliminar</button>`;
    let parrafo = `${re[i]} <button class="btn-green">Hecho</button><button class="btn-red">Eliminar</button>`;
}*/
