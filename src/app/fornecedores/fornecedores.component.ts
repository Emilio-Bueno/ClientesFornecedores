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
  submitted = false;
  form: any;

  constructor(private FornecedoresService: FornecedoresService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      telefone: [''],
      endereco: ['']
    });
  }
  ngOnInit(): void {
    this.loadFornecedores();
    this.form = this.formBuilder.group({
      acceptTerms: [false, Validators.requiredTrue]
  });
  }
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
}

onReset() {
    this.submitted = false;
    this.form.reset();
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

