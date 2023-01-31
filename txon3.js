let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton")
let saveTodoButton = document.getElementById("saveTodoButton")
/*let todoList = [{
        text: "Learn HTML",
        uniqueNo: 1
    },
    {
        text: "Learn CSS",
        uniqueNo: 2
    },
    {
        text: "Learn JavaScript",
        uniqueNo: 3
    }
];
*/
//event listener or action to be done on savebtn click

function getTodoListFromLocalStorage() {
    let stringifiedtodolist = localStorage.getItem("todoList")
    let parsedtodolist = JSON.parse(stringifiedtodolist)
    if (parsedtodolist === null) {
        return [] //ie nothing stored to localstorage return empty array
    } else {
        return parsedtodolist
    }
}
let todoList = getTodoListFromLocalStorage() //clng fn

saveTodoButton.onclick = function() {
    //to store data in localStorage the value must be in str,but here it's obj 
    //convert jsobj to str using JSON.strigify()
    localStorage.setItem("todoList", JSON.stringify(todoList)) //stringify(arr)..convert arr to str
    //todoList is an array of objects eachtodoobj altogether converted to String
    //[{"text":"Learn HTML","uniqueNo":1},{"text":"Learn CSS","uniqueNo":2},{"text":"Learn JavaScript","uniqueNo":3}]
}

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked) // INBUILT property for inputElement that returns in bool
    let labelElement = document.getElementById(labelId);
    // already have variable labelElement to createElement("label")
    /*if (checkboxElement.checked === true) {
        labelElement.classList.add("ticked") //css property
    } else {
        labelElement.classList.remove("ticked")
    } */
    labelElement.classList.toggle("ticked")
}

function onDeleteTodo(todoId) { //as passed arg is todoId, bring that argvalue inside this fn
    let todoElement = document.getElementById(todoId) //prev todoElement used to create "li" ele
    todoItemsContainer.removeChild(todoElement)
    //intentionally gave same varname as that listitem/task is to be removed
}



function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo //strconcat
    //unique id for each listitem;sothat hovered on that task/listitem corresponding checkbox gets ticked
    //use this in <input type="checkbox" id="checkboxId"
    let labelId = "label" + todo.uniqueNo //such that srikeoff that labelEle.textContent only
    //rest of lbelelements or listitem/todo or task remian unaffected
    let todoId = "todo" + todo.uniqueNo

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId //assign that created unique todoId as attvalue into attclass id
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    //inputElement.id = "checkboxInput"; 
    inputElement.id = checkboxId //variable
    //fn expression below
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId);
    }
    //exclusively to fetch that inputele n associate it to for attname of label
    inputElement.classList.add("checkbox-input"); //herecss property given
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    //labelElement.setAttribute("for", "checkboxInput");
    labelElement.setAttribute("for", checkboxId) //since variable not ""
    labelElement.id = labelId //use this id to fetch that particular labelEle n strikeoff
    //having labeltextContent=todoobj.text... value learn css rest labeltexts remain uneffected
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    //to remove that task/todo when checkbox ticked ie eventlistener so create a fn
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId); //fn call
        //todoid such that only that listitem deleted ie removechild in this fncall and rest unaffected 
    }

    deleteIconContainer.appendChild(deleteIcon);
}

function onAddTodo() {
    let todoscount = todoList.length
    let useripEle = document.getElementById("newtask")
    let useripvalue = useripEle.value //since inputele property is value ; h,p textContent
    todoscount = todoscount + 1
    if (useripvalue === "") {
        alert("Enter valid text");
        return;
    }

    let newtodo = {
        text: useripvalue,
        uniqueNo: todoscount
    }
    todoList.push(newtodo) //todoList being used in localStorages,so newly added tasks also get saved in ls
    createAndAppendTodo(newtodo); // clng fn so must be defined beforeitself later call the fn
    useripEle.value = ""

}


addTodoButton.onclick = function() {
    onAddTodo() //first define this clngfn above n then this can be called
    //fncall or callingfn so define it outside the current fn createAndAppend 
}


for (let todo of todoList) {
    createAndAppendTodo(todo);
}
