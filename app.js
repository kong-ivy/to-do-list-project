//selector
const todoinput=document.querySelector('.todo-input');
const todobutton=document.querySelector('.todo-button');
const todolist=document.querySelector('.todo-list');
const filteroption=document.querySelector('.filter-todo');
console.log(filteroption);

//event listener
document.addEventListener('DOMContentLoaded',gettodos);
todobutton.addEventListener('click',addtodo);
todolist.addEventListener('click',deletecheck);
filteroption.addEventListener('click',filtertodo);

function addtodo(event){
    //prevent form from submit
    event.preventDefault();
    const tododiv=document.createElement('div');
    tododiv.classList.add('todo');

    const newtodo=document.createElement('li');
    newtodo.innerText = todoinput.value;
    newtodo.classList.add('todo-item');

    tododiv.appendChild(newtodo);
    //add todo to local storage
    savelocal(todoinput.value);

    const completebutton=document.createElement('button');
    completebutton.innerHTML='<i class="fas fa-check"></i>';

    completebutton.classList.add('complete-btn');
    tododiv.appendChild(completebutton);

    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<i class="fas fa-trash"></i>';

    trashbutton.classList.add('trash-btn');
    tododiv.appendChild(trashbutton);


    //append to list
    todolist.appendChild(tododiv);
    todoinput.value="";

}

function deletecheck(e){
    
    const item=e.target;
    console.log(item);
    //delete
    if (item.classList[0]==='trash-btn'){
        const todo=item.parentElement;
        //animation
        todo.classList.add("fall");
        removelocaltodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        }
        )
    }

    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filtertodo(e){
    console.log(e.target.value);
    const todos=todolist.childNodes;
    console.log(todos)
    todos.forEach(function(todo) {
        console.log(todo)
        switch (e.target.value) {
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                    
                } else {
                    todo.style.display="none";
                    
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display="none";
                    
                }
                break;
        }
    });
}

function savelocal(todo){
    //check if already have thing in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function gettodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const tododiv=document.createElement('div');
        tododiv.classList.add('todo');

        const newtodo=document.createElement('li');
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');

        tododiv.appendChild(newtodo);

        const completebutton=document.createElement('button');
        completebutton.innerHTML='<i class="fas fa-check"></i>';

        completebutton.classList.add('complete-btn');
        tododiv.appendChild(completebutton);

        const trashbutton=document.createElement('button');
        trashbutton.innerHTML='<i class="fas fa-trash"></i>';

        trashbutton.classList.add('trash-btn');
        tododiv.appendChild(trashbutton);


        //append to list
        todolist.appendChild(tododiv);
    
    }
    )
}

function removelocaltodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    let d=todo.children[0].innerText;
    let i=todos.indexOf(d);
    todos.splice(i,1);
    localStorage.setItem('todos',JSON.stringify(todos));
    
}