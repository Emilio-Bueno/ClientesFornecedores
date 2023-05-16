import { FornecedoresService } from './../fornecedores.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Fornecedores } from '../Fornecedores';


@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent {
  Fornecedores: Fornecedores[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;

  constructor(private FornecedoresService: FornecedoresService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      telefone: [''],
      endereco: ['']
    });
  }

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
  }

  save() {
    if (this.isEditing){
      this.FornecedoresService.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadFornecedores();
          this.formGroupClient.reset();
          this.isEditing = false;
        }
      });

    }
    else {
      this.FornecedoresService.save(this.formGroupClient.value).subscribe({
        next: data => {
          this.Fornecedores.push(data);
          this.formGroupClient.reset();
        }
      })
    }
  }

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores() {
    this.FornecedoresService.getFornecedores().subscribe({
      next: data => this.Fornecedores = data
    });
  }

  edit(Fornecedores: Fornecedores) {
    this.formGroupClient.setValue(Fornecedores);
    this.isEditing = true;
  }

  delete(Fornecedores: Fornecedores) {
    this.FornecedoresService.delete(Fornecedores).subscribe({
      next: () => this.loadFornecedores()
    });
  }
}

