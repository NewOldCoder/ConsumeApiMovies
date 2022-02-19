import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public movieSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = ( document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight )

    if (pos > max) {

      this.peliculasService.getCartelera().subscribe( movies => {
        this.movies.push( ...movies)
      });

    }

  }

  constructor(private peliculasService: PeliculasService){}

  ngOnInit(): void {
    this.peliculasService.getCartelera()
      .subscribe( movies =>{
        //console.log(resp.results);
        this.movies = movies;
        this.movieSlideshow = movies;

      });
  }

  ngOnDestroy(){
    this.peliculasService.resetCarteleraPage();
  }
}
