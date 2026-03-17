import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  newTask: string = '';
  tasks: { title: string; completed: boolean }[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor() {
    this.loadTasks();
  }

  addTask() {
    if (this.newTask.trim().length === 0) return;
    this.tasks.push({ title: this.newTask, completed: false });
    this.newTask = '';
    this.saveTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) this.tasks = JSON.parse(saved);
  }

  get filteredTasks() {
    if (this.filter === 'active') return this.tasks.filter(t => !t.completed);
    if (this.filter === 'completed') return this.tasks.filter(t => t.completed);
    return this.tasks;
  }
  get activeCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }
  
  get completedCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }
}