import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  users: any [] = [];

  constructor(private usuariosService: UsuariosService, private router: Router){}

    ngOnInit(): void{
      this.loadUsers(); //Llamado función inicial para cargar la lista de usuarios
    }

    loadUsers(){
      this.usuariosService.getAllUsers().subscribe((res: any) => {
        this.users = res;
      });
    }

    addUsers(){
      this.router.navigate(['/form']); //ruta para agregar
    }

    editUsers(id: number){
      this.router.navigate(['/form', id]); //ruta para la vista de editar
    }

    deleteUsers(id: number){
      if(confirm('¿Deseas eliminar este uduario?')){
        this.usuariosService.deleteUsers(id).subscribe(()=>{
          this.loadUsers();//VUELVE A CARGAR
        });
      }
    }
  }
