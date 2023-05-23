import { FornecedoresService } from './../fornecedores.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted: boolean = false;
  form: any;

  constructor(private FornecedoresService: FornecedoresService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      telefone: [''],
      endereco: [''],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }
  ngOnInit(): void {
    this.loadFornecedores();
  }

  get f() { return this.formGroupClient.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formGroupClient.invalid) {
      return;
  }
}


  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  save() {
    this.submitted = true;
    if (this.formGroupClient.valid) {
      if (this.isEditing){
        this.FornecedoresService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.loadFornecedores();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.submitted = false;
            }
        });

      }
      else {
        this.FornecedoresService.save(this.formGroupClient.value).subscribe({
          next: data => {
            this.Fornecedores.push(data);
            this.formGroupClient.reset();
            this.submitted = false;
          }
        })
      }
    }
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

