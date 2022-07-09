import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/task';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../../models/empleado';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [DatePipe]
})
export class FormularioComponent implements OnInit {

  estados: string[];
  fecha?: NgbDateStruct;
  empleados: Empleado[];
  titulo: string = "Tareas"
  task: Task = new Task();
  errores: string[] = [];

  constructor(private taskService: TaskService, private router: Router,
    private activetedRouter: ActivatedRoute, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.estados = [
      'SIN_ASIGNAR',
      'ASIGNADA',
      'EN_EJECUCION',
      'EJECUTADA'
    ]
    console.log(this.estados)
    this.loadTarea();
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    this.empleadoService.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  loadTarea(){
    this.activetedRouter.params.subscribe(params => {
      const id = params.id;
      console.log(id)
      if (id){
        this.taskService.getById(id).subscribe(task => this.task = task['tarea']);
      }
      console.log(this.task)
    });
  }

  create(){
    this.task.fechaEjecucion = this.formatearFecha(this.fecha);
    console.log(this.task)
    this.taskService.createTask(this.task).subscribe(json => {
    console.log(json)
      swal.fire('Nueva Tarea', `Tarea ${json.tarea.nombre} creada con exito`, 'success');
      this.router.navigate(['/']);
    }, err => {
      console.log(err)
      this.errores = err.error as string[];
      console.log(this.errores);
    });
  }

  update(){
    this.task.fechaEjecucion = this.formatearFecha(this.fecha);
    this.taskService.update(this.task).subscribe(json => {
      console.log(json)
      swal.fire('Tarea Actualizada', `La Tarea se Actualizo con exito`, 'success');
      this.router.navigate(['/']);
    }, error => {
      console.log(error)
      this.errores = error.error as string[];
    });
  }

  formatearFecha(fecha){
    let fechaFormato = `${this.fecha?.year}/${this.fecha?.month}/${this.fecha?.day}`;
    return fechaFormato.toString();
  }

}
