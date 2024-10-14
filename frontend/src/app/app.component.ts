import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],  // Ajoute CommonModule ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  title = 'CheckList';

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

  toggleTaskCompletion(task: Task): void {
    // Inverser l'état de complétion de la tâche
    task.completed = !task.completed;

    // Mettre à jour la tâche dans le backend si nécessaire
    this.taskService.updateTask(task.id, task).subscribe((updatedTask) => {
      console.log('Tâche mise à jour:', updatedTask);
    });
  }
}
