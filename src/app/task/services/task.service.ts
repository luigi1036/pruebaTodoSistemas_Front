import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Task } from 'src/app/models/task';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private router: Router) { }

  url = environment

  getTask(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url.urlbackendTask}/alltareas`)
  }

  createTask(task: Task): Observable<any>{
    return this.http.post<any>(`${this.url.urlbackendTask}/tarea/crear`, task)
    .pipe(
      catchError(e => {
        if(e.error.mensaje){
          console.log(e.error.mensaje);
          
        }
        swal.fire('Error', 'Error Al crear la Tarea', 'error');
        this.router.navigate(['/']);
        return throwError(e);
      })
    );
  }

  getById(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.url.urlbackendTask}/tarea/${id}`)
    .pipe(
      catchError(e => {
        if(e.status != 401 && e.error.emnsaje){
        swal.fire('Error al Editar', e.error.mensaje, 'error');
        this.router.navigate(['/']);
        return throwError(e);
      }
      })
    );
  }

  update(task: Task): Observable<Task>{
    return this.http.put(`${this.url.urlbackendTask}/tarea/${task.id}`, task).pipe(
      map((response: any) => response as Task),
      catchError(e => {
        if(e.error.mensaje){
          console.log(e.error.mensaje);
          
        }
        swal.fire('Error al Editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.url.urlbackendTask}/tarea/${id}`);
  }
}
