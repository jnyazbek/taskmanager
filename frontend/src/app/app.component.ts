import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  title = 'CheckList';
  showForm: boolean = false; // affichage du formulaire
  newTask: Task = {title: '', priority:null, completed: false};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log('Tâches récupérées depuis le backend :', tasks);
      this.tasks = tasks;
    });
  }

  showAddTaskForm(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.newTask.title && this.newTask.priority) {
      this.taskService.createTask(this.newTask).subscribe((task) => {
        this.tasks.push(task);  // Le backend va générer l'ID ici
        this.newTask = { title: '', priority:null, completed: false };  // Réinitialiser le formulaire
        this.showForm = false;  // Fermer le formulaire
      });
    }
    else{
      console.log('Error');
    }
  }

  toggleTaskCompletion(task: Task): void {
    // Inverser l'état de complétion de la tâche
    task.completed = !task.completed;

    // Mettre à jour la tâche dans le backend si nécessaire
    if(task.id !== undefined){
      this.taskService.updateTask(task.id, task).subscribe((updatedTask) => {
        console.log('Tâche mise à jour:', updatedTask);
      });
    }
    else{
      console.error("Erreur : la tâche ne possède pas d'id valide");
    }
    
  }
}
