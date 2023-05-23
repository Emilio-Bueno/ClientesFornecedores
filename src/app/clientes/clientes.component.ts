import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Clientes } from '../Clientes';
import { ClientesService } from './../clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  Clientes: Clientes[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;

  constructor(private ClientesService: ClientesService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      genero: [''],
      email: [''],
      numero: [''],
      endereco: [''],
      regiao: ['']
    });
  }

  clean() {
    this.formGroupClient.reset();
    this.isEditing = false;
  }

  save() {
    if (this.isEditing) {
      this.ClientesService.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadClientes();
          this.formGroupClient.reset();
          this.isEditing = false;
        }
      });

    }
    else {
      this.ClientesService.save(this.formGroupClient.value).subscribe({
        next: data => {
          this.Clientes.push(data);
          this.formGroupClient.reset();
        }
      })
    }
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.ClientesService.getClientes().subscribe({
      next: data => this.Clientes = data
    });
  }

  edit(Clientes: Clientes) {
    this.formGroupClient.setValue(Clientes);
    this.isEditing = true;
  }

  delete(Clientes: Clientes) {
    this.ClientesService.delete(Clientes).subscribe({
      next: () => this.loadClientes()
    });
  }
}

