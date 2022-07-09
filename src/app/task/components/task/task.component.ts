import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from '../../services/task.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = [];
  taskSelect: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTask().subscribe(response => {
      this.tasks = response;
    })
  }

  eliminar(task: Task){
    this.alerta(task)
  }

  alerta(task){
    swal.fire({
      title: `Esta Seguro Eliminar ${task.nombre}`,
      text: 'Esta Acciòn no se puede Revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'NO',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.delete(task.id).subscribe( response => {
          this.tasks = this.tasks.filter(tk => tk !== task);
          swal.fire(
            'Eliminada',
            `La tarea ${task.nombre} se Elimino `,
            'success'
          );
        });
      }
    });
  }

}
