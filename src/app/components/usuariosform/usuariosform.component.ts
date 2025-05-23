import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuariosform',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './usuariosform.component.html',
  styleUrl: './usuariosform.component.css'
})
export class UsuariosformComponent {

  userForm!: FormGroup;
  id: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private usuariosService: UsuariosService){
      this.id = this.route.snapshot.params['id'];
    }

    ngOnit(): void{
      this.userForm = this.fb.group({
        name: [''],
        email: [''],
        address: [''],
        phone:[''],
      });
      if(this.id > 0){
        this.editFormUsers(this.id);
      }
    }

    editFormUsers(id:any){
      if(this.id){
        this.usuariosService.getUsersById(this.id).subscribe(data => {
            this.userForm.patchValue(data);
        });
      }
    }

    onSubmit() {
      if (this.userForm.invalid) return this.userForm.markAllAsTouched();

      if (this.id) {
      this.usuariosService.updateUsers(this.id, this.userForm.value).subscribe(() => {
        this.router.navigate(['/']); // vuelve a la lista
        });
      } else {
        this.usuariosService.addUsers(this.userForm.value).subscribe(() => {
          this.router.navigate(['/']); // vuelve a la lista
        });
      }
    }

    redirect(): void {
      this.router.navigate(['']);
    }



}
