import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    private API_URL = 'https://jsonplaceholder.typicode.com/users'; //API
    private STORAGE_KEY = 'users';

    constructor(private http: HttpClient){   }

      getAllUsers() : Observable <any> {

        // if(typeof window !== 'undefined'){
        //   const localData = localStorage.getItem(this.STORAGE_KEY);
        //   if (localData) {
        //     return of(JSON.parse(localData));
        //   }
        // }
        return this.http.get<any>(this.API_URL).pipe(
          map((res:any) => {

            const users = res || [];

            if(typeof window !== 'undefined'){
              localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
            }
            return users;
          })
        );
      }

      getUsersById(id: number): Observable<any> {
          const Data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
          return of(Data.find((users: any) => users.id == id));//Servicio devuelve el usuario por ID
          }

      addUsers(users:any): Observable<any>{
        const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
        const newUsers = { ...users,id: Date.now()}; //simulación del ID
        data.push(newUsers);
        localStorage.setItem(this.STORAGE_KEY,JSON.stringify(data));
        return of(newUsers);//Servicio para agregar usuario
      }

      updateUsers(id:number, users: any): Observable<any>{
        let data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
        data = data.map((item:any) => (item.id == id ? { ...item, ...users}: item));
        localStorage.setItem(this.STORAGE_KEY,JSON.stringify(data));
        return of({...users, id});//actualizar usuario
      }

      deleteUsers(id: number): Observable<any>{
        let data =JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
        data = data.filter((item:any) => item.id != id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        return of({message: 'Eliminado correctamente'});
      }
}
