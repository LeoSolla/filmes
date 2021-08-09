import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { MovieModel } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formValue !: FormGroup;
  movieModel: MovieModel = new MovieModel();
  data !: any;
  btnAdd !: boolean;
  btnUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
              private api: ApiService) { }

  ngOnInit(): void {
      this.formValue = this.formbuilder.group({
        titulo: [''],
        diretor: [''],
        genero: [''],
        ano: [''],
        descricao: [''],
        poster: ['']
    })
    this.getAllMovies();
  }
  clickAddMovie(){
    this.formValue.reset();
    this.btnAdd = true;
    this.btnUpdate = false;
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
  getAllMovies() {
    this.api.getMovies()
    .subscribe(res=>{
      this.data = res;
    })
  }
  deleteMovie(data: any){
    this.api.deleteMovie(data.id)
    .subscribe(res=>{
      alert("Filme deletado!");
      this.getAllMovies();
    })
  }
  editMovie(data: any){
    this.btnAdd = false;
    this.btnUpdate = true;
    this.movieModel.id = data.id;
    this.formValue.controls['titulo'].setValue(data.titulo);
    this.formValue.controls['diretor'].setValue(data.diretor);
    this.formValue.controls['genero'].setValue(data.genero);
    this.formValue.controls['ano'].setValue(data.ano);
    this.formValue.controls['descricao'].setValue(data.descricao);
    this.formValue.controls['poster'].setValue(data.poster);
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
}
