var express= require('express');
var router= express.Router();
var mongoose = require('mongoose');

var TasksModel = require('../Models/TasksModel');


router.get('/tasks', function(req,res,next){
    TasksModel.find({},function(err,tasksdata){
        if (err) {
            console.log("error occured at server while trying to fetch tasks records");
            res.send(err);
        }
        else{
            res.json(tasksdata);
        }
        
    });
    
        
});

router.post('/tasks',function(req,res,next){
    console.log(req.body);
   TasksModel.create(req.body,function(err,data){
       
       
       if(err) {
           res.send(err);
           console.log("error occured at server while trying to post a tasks record");
       }
       else{
           res.json({message:'New task has been successfully added',task:data});
       }
       
   });
});

router.get('/tasks/:tname', function(req,res,next){
   TasksModel.findOne({title:req.params.tname}, function(err,data){
       
    if (err){
        console.log("an error occured while trying to read the Task record from database");
        res.send(err);
    }
       else{
           if(!data) {
               res.json({message:"Such a task does not exist in the database"});
           }
           else{
               res.json(data);
           }
       }
       
   });
});

router.put('/tasks/:title',function(req,res,next){
    
    var newdata = req.body;
    console.log(newdata);
    
 TasksModel.findOne({title:req.params.title},function(err,task){
     if (err) {
         console.log("An error occured while trying to fetch task details from database");
         res.send(err);
     }
     else{
         if(!task){
             console.log("such a task does not exists");
           res.json({message:"Such a task does not exist",status:'fail'});  
         }
         else{
             for(key in newdata)
                 task[key]=newdata[key];
             
             console.log("new task : "+ task);
             task.save(function(err,newdata){
                 res.json({message: "Task updated successfully",status:'ok',task:newdata});
             });
             
         }
     }
 });
 });   


router.delete('/tasks/:title', function(req,res,next){
    var title=req.params.title;
    console.log(title);
    TasksModel.findOne({title:title}, function(err,task){
        
        if(err) res.send("An error occured while trying to fetch the task record");
        else{
            if(!task) res.json({message:"such a task does not exist"});
            else{
                task.remove(function(err,data){
                    res.json({status:'success',message:"Task has been removed successfully", title:title});
                });
            }
        }
        
        
    });
   
});

module.exports = router;