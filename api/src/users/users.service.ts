import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type User = {
  userId: number;
  email: string;
  password: string;
  // jokes: string[];
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      userId: this.users.length + 1,
      email,
      password: hashedPassword,
      // jokes: [],
    };
    this.users.push(newUser);
    return newUser;
  }

  // async addJokeToUser(email: string, joke: string): Promise<void> {
  //   const user = await this.findOne(email);
  //   if (user) {
  //     user.jokes.push(joke);
  //   }
  // }

  // async getJokesForUser(email: string): Promise<string[] | undefined> {
  //   const user = await this.findOne(email);
  //   return user?.jokes;
  // }
}
