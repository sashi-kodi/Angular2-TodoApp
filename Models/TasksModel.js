var mongoose=require('mongoose');

var tasksSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    isDone:{type:Boolean, required:true}
    
});

var TasksModel = mongoose.model('TasksModel', tasksSchema, 'TasksDB');
module.exports=TasksModel;
