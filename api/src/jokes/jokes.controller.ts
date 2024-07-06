import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('jokes')
export class JokesController {
  constructor(private jokesService: JokesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('random')
  getRandomJoke() {
    return this.jokesService.getRandomJoke();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('category')
  getJokeByCategory(@Query('category') category: string) {
    return this.jokesService.getJokeByCategory(category);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('categories')
  getCategories() {
    return this.jokesService.getCategories();
  }
}
