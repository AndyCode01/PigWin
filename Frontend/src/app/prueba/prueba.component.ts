import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
})
export class PruebaComponent implements OnInit {
  registerForm = this.Builder.group({
    apuesta: ['', Validators.required],
    equipo: ['', Validators.required],
    comentario: ['', [Validators.required]],
    roleid: [1, Validators.required]
  });

  isSubmitted = false;
  roles=[
    {id:1, tittle: 'hpta'},
    {id:2, tittle: 'sapo'}
  ]
  constructor(private Builder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm.get('roleid')?.valueChanges.subscribe((roleid) => {
      console.log('SELECT ', roleid);

    })
  }

  onSubmit(): void {
    if(!this.registerForm.invalid){
      console.log(
        'Form lanzado',
        this.registerForm.value,
        this.registerForm.invalid
      );
    }
    this.isSubmitted= true;
  }
}
