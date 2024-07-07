import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class JokesService {
  constructor(private httpService: HttpService) {}

  async getRandomJoke(category?: string) {
    return this.httpService
      .get(
        `https://api.chucknorris.io/jokes/random${category ? `?category=${category}` : ''}`,
      )
      .pipe(map((response) => response.data));
  }
  async getCategories() {
    return this.httpService
      .get('https://api.chucknorris.io/jokes/categories')
      .pipe(map((response) => response.data));
  }

  replaceNameInJoke(joke: string, name: string): string {
    return joke.replace(/Chuck Norris/g, name);
  }
}
