import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      userId: this.users.length + 1,
      email,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }
}
