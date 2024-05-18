import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { SignUpDto, LoginDto } from './dto/auth.dto';
import { Msg, Jwt } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<Msg> {
    const hashed = await bcrypt.hash(dto.password, 12);
    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashed,
          nickName: dto.nickName,
        },
      });
      return {
        message: 'ok',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('This email is already taken');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto): Promise<Jwt> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email or password is incorrect');
    }
    const isValid = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!isValid) {
      throw new ForbiddenException('Email or password is incorrect');
    }
    return this.generateJwtToken(user.id, user.email);
  }

  async generateJwtToken(userId: number, email: string): Promise<Jwt> {
    const payload = { sub: userId, email };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
    };
  }

  async refreshToken(userId: number): Promise<Jwt> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const token = await this.jwtService.signAsync({
      sub: userId,
      email: user.email,
    });
    return {
      accessToken: token,
    };
  }
}
