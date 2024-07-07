import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class JokesService {
  constructor(private httpService: HttpService) {}

  async getRandomJoke(category?: string) {
    return this.httpService
      .get(
        `https://api.chucknorris.io/jokes/random${category ? `?category=${category}` : ''}`,
      )
      .pipe(
        map((response) => response.data),
        // map((joke) => {
        //   this.usersService.addJokeToUser(email, joke.value);
        //   return joke;
        // }),
      );
  }
  async getCategories() {
    return this.httpService
      .get('https://api.chucknorris.io/jokes/categories')
      .pipe(map((response) => response.data));
  }
}
