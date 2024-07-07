import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from '../users/users.service';

@Module({
  imports: [HttpModule],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule {}
