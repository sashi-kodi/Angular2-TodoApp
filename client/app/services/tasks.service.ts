import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
constructor(private http:Http){

}
getTasks(){
return this.http.get('/api/tasks')
.map((res:Response)=> res.json());
}

deleteTask(title){
return this.http.delete('/api/tasks/'+title)
.map(res=>res.json());
}

update(newtask){

return this.http.put('/api/tasks/'+newtask.title,newtask)
.map(res=>res.json());

}
addTask(task){

var headers = new Headers();
headers.append('Content-Type', 'application/json');
return this.http.post('/api/tasks', JSON.stringify(task), {headers:headers})
.map(res=>res.json());
}

}