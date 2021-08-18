import { MovieModalComponent } from './../../shared/components/movie-modal/movie-modal.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { MovieModel } from './home.model';
import { MatDialog } from '@angular/material/dialog';

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
              private api: ApiService,
              public dialog: MatDialog) { }

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
  clickAddMovie(data: any){    
     const dialogRef = this.dialog.open(MovieModalComponent, {
      panelClass: "custom-dialog-container",
      width: "900px",
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllMovies();
    });

    this.formValue.reset();
    //this.btnAdd = true;
    //this.btnUpdate = false;
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
    const dialogRef = this.dialog.open(MovieModalComponent, {
      panelClass: "custom-dialog-container",
      width: "900px",
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllMovies();
    });

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

}
