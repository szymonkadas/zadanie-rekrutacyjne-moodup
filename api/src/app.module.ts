import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UsersService } from './users/users.service';
// import { JokesModule } from './jokes/jokes.module';
// import { ConfigModule } from '@nestjs/config';


@Module({
  // imports: [AuthModule, JokesModule, ConfigModule.forRoot()],
  imports: [],
  controllers: [AppController],
  // providers: [AppService, UsersService],
  providers: [AppService],
})
export class AppModule {}
