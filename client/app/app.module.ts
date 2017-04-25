import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {TaskService} from './services/tasks.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

@NgModule({
imports:[BrowserModule,HttpModule,FormsModule],
declarations:[AppComponent,TasksComponent],
providers:[TaskService],
bootstrap:[AppComponent]

})
export class AppModule{
    
}