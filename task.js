let taskIdCounter=0;

document.getElementById("submit-task").addEventListener
('click',addTask);

function addTask(){
    const inputBox = document.getElementById('inputbox');
    const taskText = inputBox.value.trim();

    if(taskText===''){
        console.log("rewrite please");
        return -1;
    }

    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('draggable','true');
    task.setAttribute('id','task-'+ taskIdCounter++);
    console.log(task.getAttribute('draggable'));
    task.innerHTML=`
        <span>${taskText}</span>
           <div class="task-actions">  
                <button onclick="editTask(this)">✏️</button>
                <button onclick="deleteTask(this)">❌</button> 
            </div>`;

    document.getElementById('todo').appendChild(task);
    inputBox.value='';
    dragListener(task);
    localStorage.getItem(task);

}



function editTask(button){
    const task = button.parentElement.parentElement;
    const newTaskText = prompt("edit task",task.querySelector('span').textContent);
    if(newTaskText!==null && newTaskText!==''){
        task.querySelector('span').textContent = newTaskText.trim();
    }
}

function deleteTask(button){
    const task = button.parentElement.parentElement;
    task.remove();
}

function dragListener(task){
    task.addEventListener('dragStart',dragStart);
    task.addEventListener('dragEnd',dragEnd);
    localStorage.getItem(task);
}



function dragStart(event){
    event.dataTransfer.setData('text',event.target.id);
    setTimeout(()=>{
        event.target.classList.add('hide');
    },0);
}

function dragEnd(event){
    event.target.classList.remove('hide');
}

const column = document.querySelectorAll('.column');
console.log(column);

column.forEach((col)=>{
    col.addEventListener('dragover',dragOver);
    col.addEventListener('dragenter',dragEnter);
    col.addEventListener('dragleave',dragLeave);
    col.addEventListener('drop',drop);


});

function dragOver(event){
    event.preventDefault();
}

function dragEnter(event){
    event.preventDefault();
    if(event.target.classList.contains('column')){
        event.target.classList.add('over');
    }
}

function dragLeave(event){
    if(event.target.classList.contains('column')){
        event.target.classList.remove('over');
    }
}

function drop(event){
    console.log(event);
    event.preventDefault();
    let idd= event.dataTransfer.getData('text');
    console.log(idd);
    let draggableTask = document.getElementById('idd');
    console.log(draggableTask);
    console.log(draggableTask+"draggable mi");
    if(event.target.classList.contains('column')){
       event.target.classList.remove('over');
       event.target.appendChild(draggableTask);
  
    }
}

