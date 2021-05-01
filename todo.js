const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let idNumbers = 1; //add

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, check) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = idNumbers++; //toDos.length + 1
    checkbox.type = "checkbox";
    checkbox.checked = check;
    checkbox.addEventListener("change", finishToDo);
    span.innerText = text;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
        check: check
    };
    toDos.push(toDoObj);
    saveToDos();
}

function finishToDo(event) {
    const checkbox = event.target;
    const li = checkbox.parentNode;
    const checkToDo = toDos.filter(function(toDo) {
        return toDo.id === parseInt(li.id);
    });
    const isCheck = checkToDo[0].check;
    console.log(checkToDo[0].check);
    if (isCheck !== true) {
        checkToDo[0].check = true;
    } else {
        checkToDo[0].check = false;
    }
    console.log(checkToDo[0].check);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue, false);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text, toDo.check);
        })
    };
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
};
init();