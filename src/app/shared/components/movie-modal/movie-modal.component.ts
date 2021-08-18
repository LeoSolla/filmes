import { MovieModel } from './../../../features/home/home.model';
import { ApiService } from 'src/app/shared/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {

  formValue !: FormGroup;
  movieModel: MovieModel = new MovieModel();
  btnAdd !: boolean;
  btnUpdate !: boolean;

  constructor(public dialogRef: MatDialogRef<MovieModalComponent>,
    private formbuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formValue = this.formbuilder.group({
      titulo: [''],
      diretor: [''],
      genero: [''],
      ano: [''],
      descricao: [''],
      poster: ['']
    })
    
    this.btnAdd = data.btnAdd;
    this.btnUpdate = data.btnUpdate;
    this.movieModel.id = data.data.id;
    this.formValue.controls['titulo'].setValue(data.data.titulo);
    this.formValue.controls['diretor'].setValue(data.data.diretor);
    this.formValue.controls['genero'].setValue(data.data.genero);
    this.formValue.controls['ano'].setValue(data.data.ano);
    this.formValue.controls['descricao'].setValue(data.data.descricao);
    this.formValue.controls['poster'].setValue(data.data.poster);  
  }

  ngOnInit(): void {}

    getAllMovies() {
      this.api.getMovies()
      .subscribe(res=>{
        this.data = res;
      })
    }
    postMovieDetails() {
      this.movieModel.titulo = this.formValue.value.titulo;
      this.movieModel.diretor = this.formValue.value.diretor;
      this.movieModel.genero = this.formValue.value.genero;
      this.movieModel.ano = this.formValue.value.ano;
      this.movieModel.descricao = this.formValue.value.descricao;
      this.movieModel.poster = this.formValue.value.poster;
      this.api.postMovie(this.movieModel)
      .subscribe(res=>{
        console.log(res);
        alert("Filme cadastrado com sucesso!");
        let ref = document.getElementById('cancelar');
        ref?.click();
        this.formValue.reset();
        this.getAllMovies();
      },
      err=>{
        alert("Ops... alguma coisa deu errada");
      })
    }
    updateMovieDetails() {
      this.movieModel.titulo = this.formValue.value.titulo;
      this.movieModel.diretor = this.formValue.value.diretor;
      this.movieModel.genero = this.formValue.value.genero;
      this.movieModel.ano = this.formValue.value.ano;
      this.movieModel.descricao = this.formValue.value.descricao;
      this.movieModel.poster = this.formValue.value.poster;
  
      this.api.updateMovie(this.movieModel, this.movieModel.id)
      .subscribe(res=>{
        alert("Filme atualizado com sucesso!");
        let ref = document.getElementById('cancelar');
        ref?.click();
        this.formValue.reset();
        this.getAllMovies();
      })    
    }

    goBackHandler() {
      this.dialogRef.close();
      this.getAllMovies();
    }
}
