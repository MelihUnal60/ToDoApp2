const input = document.getElementById('txtTask');
const taskList = document.getElementById('task-list');
var edittedItem;
let items;

loadItems();
eventListener();

function eventListener(){
    taskList.addEventListener("click", deleteItem);

    taskList.addEventListener("click", regeditItem);
}

function addNewItem(){
    
    createItem(input.value);
    setItemToLS(input.value);
    
}

function breakSubmit(){
    return false;
}

function createItem(text){
    const li = document.createElement('li');
    li.classList = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(input.value));

    const deleteBtn = document.createElement('btn');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList = "btn btn-danger btn-sm float-end";
    

    const editBtn = document.createElement('btn');
    editBtn.innerText = "Edit";
    editBtn.classList = "btn btn-secondary btn-sm float-end mx-3";

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
}

function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem("tasks",JSON.stringify(items));
}

function deleteAll(){
    if(confirm("Are you sure?")){
        taskList.innerHTML = '';
    }
    localStorage.clear();
}

function deleteItem(e){
    
    if(e.target.className === "btn btn-danger btn-sm float-end"){
        if(confirm('Are you sure?')){
            e.target.parentElement.remove();

            //localstorageden silmek
            deleteItemFromLS(e.target.parentElement.parentElement.textContent)
        }
    }
}

function regeditItem(e){
    if(e.target.className === "btn btn-secondary btn-sm float-end mx-3"){
        
        input.value = e.target.parentElement.innerText;
        sabit = e.target.parentElement;
    }
}

function setEditItem(){
    sabit.innerHTML = input.value;

    const deleteBtn = document.createElement('btn');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList = "btn btn-danger btn-sm float-end";
    

    const editBtn = document.createElement('btn');
    editBtn.innerText = "Edit";
    editBtn.classList = "btn btn-secondary btn-sm float-end mx-3";
    
    sabit.appendChild(deleteBtn);
    sabit.appendChild(editBtn);
}

function getItemsFromLS(){
    if(localStorage.getItem("tasks") === null)
        items = [];
    else
        items = JSON.parse(localStorage.getItem("tasks"));

    return items;
}

function deleteItemFromLS(text){
    items=getItemsFromLS();
    items.forEach(function(todo, index){
        if(todo===text)
            items.splice(index, 1);
    });
localStorage.setItem("tasks", JSON.stringify(items));
}

function loadItems(){
    items = getItemsFromLS();
    items.forEach(function(todo){
        createItem(todo);
    });
}