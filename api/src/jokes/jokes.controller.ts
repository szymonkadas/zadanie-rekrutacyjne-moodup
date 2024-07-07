import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('jokes')
export class JokesController {
  constructor(private jokesService: JokesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('random')
  getRandomJoke(@Query('category') category?: string) {
    return this.jokesService.getRandomJoke(category);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('categories')
  getCategories() {
    return this.jokesService.getCategories();
  }
}
