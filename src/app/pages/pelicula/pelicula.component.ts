import { Cast } from './../../interfaces/credits-response';
import { PeliResponse } from './../../interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: PeliResponse;
  public cast: Cast[]=[];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router) { }

  ngOnInit(): void {

    const id  = this.activatedRoute.snapshot.params['id'];

    combineLatest([

      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id)

    ]).subscribe ( ([ movie, cast ]) => {

      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = movie;
      this.cast = cast.filter(actor => actor.profile_path !== null)


    });



  //   this.peliculasService.getPeliculaDetalle(id).subscribe(movie =>{

    //   if (!movie) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.pelicula = movie;

    // });

  //   this.peliculasService.getCast(id).subscribe( cast => {

  //     this.cast = cast;
  //     console.log(cast);
  //     this.cast = cast.filter(actor => actor.profile_path !== null)
  //   });
  }

  onRegresar(){
    this.location.back();
  }

}
