"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tasks_service_1 = require("../../services/tasks.service");
var TasksComponent = (function () {
    function TasksComponent(taskService) {
        var _this = this;
        this.taskService = taskService;
        this.taskService.getTasks()
            .subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    }
    TasksComponent.prototype.updateStatus = function (task) {
        var _this = this;
        var newtask = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.update(newtask)
            .subscribe(function (data) {
            for (var i = 0; i < _this.tasks.length; i++) {
                if (_this.tasks[i].title === data.task.title) {
                    break;
                }
            }
            _this.tasks[i].isDone = data.task.isDone;
        });
    };
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        };
        this.taskService.addTask(newTask)
            .subscribe(function (response) {
            console.log(response);
            _this.tasks.push(response.task);
            _this.title = "";
        });
    };
    TasksComponent.prototype.deleteTask = function (title) {
        var _this = this;
        this.taskService.deleteTask(title)
            .subscribe(function (data) {
            console.log(data);
            if (data.status == 'success') {
                for (var i = 0; i < _this.tasks.length; i++) {
                    if (_this.tasks[i].title === data.title) {
                        break;
                    }
                }
                _this.tasks.splice(i, 1);
            }
        });
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tasks',
        templateUrl: 'tasks.component.html'
    }),
    __metadata("design:paramtypes", [tasks_service_1.TaskService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map