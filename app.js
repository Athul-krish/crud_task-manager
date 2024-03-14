const express = require("express");
const morgan =  require("morgan");

const app = new express();
app.use(morgan('dev'));
app.use(express.json());
 //in memory storage for task
let tasks = [];
//route to get all tasks
app.get('/',(req,res)=>{
     res.json(tasks);
})
//pushing
app.post('/add',(req,res)=>{
    const task = req.body
    tasks.push(req.body);
    res.send({ message : "Task Added",tasks})
})

//deleting
app.delete('/del/:id',(req,res)=>{
    const id = req.params.id;
    const index = tasks.findIndex(task=>task.id===id);
    if(index===-1){
        res.send("Task not found");
    }else{
        tasks.splice(index,1);
        res.json(tasks);
    }
    res.send({message : "Task Deleted ",tasks})
})


//route to get a task by ID
app.get('/tasks/:id',(req,res)=>{
     const id = req.params.id;
     const task = tasks.find(task=>task.id===id);
     if(!task){
        res.send("Task not found");
     }
     else{
        res.json(task); 
     }
})

app.put('/task/:id',(req,res)=>{
    const id = req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found");
    }else{
        tasks.splice(index,1,updatedTask);
        //task[index] = updatedTask;
        res.json(tasks);
    }
})



app.listen(3000,(req,res)=>{
    console.log("Port running successfully on port 3000");
})
