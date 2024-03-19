import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { BannerComponent } from '../../../core/components/banner/banner.component';
import { MovieService } from '../../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../../shared/models/video-content.interface';
import { Observable, catchError, combineLatest, forkJoin, map, of, throwError } from 'rxjs';

@Component({
  selector: 'app-browse-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerComponent,
    MovieCarouselComponent,
  ],
  templateUrl: './browse-home.component.html',
  styleUrl: './browse-home.component.scss',
})
export class BrowseHomeComponent implements OnInit {
  
  auth = inject(AuthService);
  movieService = inject(MovieService);
  name = JSON.parse(sessionStorage.getItem('LoggedInUser') || '{}').name;
  userProfileImg = JSON.parse(sessionStorage.getItem('LoggedInUser') || '{}')
    .picture;
  email = JSON.parse(sessionStorage.getItem('LoggedInUser') || '{}').email;


  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated(),
  ];

  // forkJoin(this.sources)
  //   .pipe(
  //     catchError(error => {
  //       console.error('Hata oluştu:', error);
  //       return throwError(error); // Hata zincirini devam ettirin
  //     })
  //   ).subscribe({
  //     next: ([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
  //       // Tüm API çağrıları başarılıysa buraya gelir
  //       this.movies = movies.results as IVideoContent[];
  //       this.tvShows = tvShows.results as IVideoContent[];
  //       this.ratedMovies = ratedMovies.results as IVideoContent[];
  //       this.nowPlayingMovies = nowPlaying.results as IVideoContent[];
  //       this.upcomingMovies = upcoming.results as IVideoContent[];
  //       this.popularMovies = popular.results as IVideoContent[];
  //       this.topRatedMovies = topRated.results as IVideoContent[];
  //     },
  //     error: (error) => {
  //       // Herhangi bir API çağrısı hata döndürürse buraya gelir
  //       console.error('API çağrısı hata döndürdü:', error);
  //       // Kullanıcıya uygun geri bildirimi sağlamak için gerekli adımları alabilirsiniz.
  //     }
  //   });

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((res: any) => {
      this.movies = res.results;
      this.bannerDetail$ = this.movieService.getBannerDetail(res.results[1].id);
        this.bannerVideo$ = this.movieService.getBannerVideo(res.results[1].id);
        this.getMovieKey();
    });
    this.movieService.getTvShows().subscribe((res: any) => {
      this.tvShows = res.results;
    });
    this.movieService.getRatedMovies().subscribe((res: any) => {
      this.ratedMovies = res.results;
    });
    this.movieService.getNowPlayingMovies().subscribe((res: any) => {
      this.nowPlayingMovies = res.results;
    });
    this.movieService.getPopularMovies().subscribe((res: any) => {
      this.popularMovies = res.results;
    });
    this.movieService.getTopRated().subscribe((res: any) => {
      this.topRatedMovies = res.results;
    });
    this.movieService.getUpcomingMovies().subscribe((res: any) => {
      this.upcomingMovies = res.results;
    });
  }

  getMovieKey() {
    this.movieService.getBannerVideo(this.movies[0].id)
    .subscribe(res=>{
      console.log(res);
    })
  }

  signOut() {
    sessionStorage.removeItem('LoggedInUser');
    this.auth.signOut();
  }
}
