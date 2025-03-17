import { inject, Injectable, signal, Signal } from '@angular/core';
import { ArticleModel } from '../models/article.model';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListCourseService {

  list = signal<ArticleModel[]>([]);
  httpClient = inject(HttpClient)

  constructor() { 
    this.loadData();
  }

  loadData() {
    this.httpClient.get<ArticleModel[]>("http://localhost:5298/api/article")
      .subscribe(data => {
      this.list.set(data);
    })
  }

  add(article: ArticleModel) {
    // // modifier completement
    // // list.set(/*nouvelle liste*/[])

    // // mofication en fonction des anciennes valeurs
    // this.list.update(old => [...old, article]);
    return this.httpClient.post('http://localhost:5298/api/article', article)
      .pipe(tap(() => this.loadData()))
  }

  delete(article: ArticleModel) {
    // this.list.update(old => old.filter(a => a !== article));
    return this.httpClient.delete('http://localhost:5298/api/article/'+article.id)
      .pipe(tap(() => this.loadData()))
  }

  clear() {
    // éxécuter plusieurs requetes en meme temps
    // Equivalent à Promise.all
    // return forkJoin(
    //   // transformer chaque article en observable
    //   this.list().map(a => this.delete(a)
    //     // si un observable n'a pas réussi
    //     // renvoyer l'article a qui a échoué
    //     .pipe(catchError(_ => of(a))))
    // ).pipe(tap((failedValues) => {
    //   // mettre à jour la liste avec les anciennes
    //   // valeur en ne conservant que ceux qui ont échoués
    //   this.list.update(oldValue => oldValue.filter(v => failedValues.includes(v)))
    // }));

    return forkJoin(this.list().map(a => this.delete(a)))
      .pipe(tap(() => this.loadData()))

    // return this.httpClient.delete('http://localhost:5166/api/article/all')
    //   .pipe(tap(() => this.loadData()))
    // for(let a of this.list()) {
    //   this.delete(a).subscribe();
    // }
  }
}
