import {Component} from '@angular/core';
import {TaskService} from '../../services/tasks.service';
import {Task} from '../../../Task';

@Component({
moduleId:module.id,
selector:'tasks',
templateUrl:'tasks.component.html'
})
export class TasksComponent{
tasks:Task[];

title:string;
 constructor(private taskService: TaskService){
    this.taskService.getTasks()
    .subscribe(tasks=>{
        this.tasks=tasks;
    }
    );
 }
 updateStatus(task){
   var newtask ={
   _id:task._id,
   title:task.title,
   isDone:!task.isDone
   };
   
   this.taskService.update(newtask)
   .subscribe(data=>{
      for(var i=0;i<this.tasks.length;i++){
      if(this.tasks[i].title===data.task.title){
        break;
      }
  }
  this.tasks[i].isDone=data.task.isDone;
   });
 }
 addTask(event){
 event.preventDefault();
 var newTask ={
 title:this.title,
 isDone:false
 };
 
 this.taskService.addTask(newTask)
 .subscribe(response=>{
 console.log(response);
 this.tasks.push(response.task);
 this.title="";
 })
 
 }

deleteTask(title){
this.taskService.deleteTask(title)
.subscribe(data=>{
console.log(data);
  if(data.status=='success'){
  for(var i=0;i<this.tasks.length;i++){
      if(this.tasks[i].title===data.title){
        break;
      }
  }
  this.tasks.splice(i,1);
  }
});

}

}
