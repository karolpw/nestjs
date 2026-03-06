import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { db } from '../db/index';
import { usersTable } from '../db/schema';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable() 
export class AuthService {

  constructor(private jwtService: JwtService){}

  async register(createAuthDto: CreateAuthDto){
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10); // hashowanie hasła, 10 oznacza ile razy algorytm wymiesza hasło

    return await db.insert(usersTable).values({
      email: createAuthDto.email,
      password: hashedPassword
    }).returning();
  }

  async login(createAuthDto: CreateAuthDto){
    const user = await db.select().from(usersTable).where(eq(usersTable.email, createAuthDto.email));

    if(!user.length){
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const ValidPassword = await bcrypt.compare(createAuthDto.password, user[0].password);

    if(!ValidPassword){
      throw new UnauthorizedException('Nieprawidłowy email lub hasło');
    }

    const token = this.jwtService.sign({
      sub: user[0].id,
      email: user[0].email
    });

    return {access_token: token};
  }
}
