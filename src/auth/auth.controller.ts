import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  singUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.login(dto);
    res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
    return { message: 'ok' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(dto);
    res.setHeader('Authorization', '');
    return { message: 'ok' };
  }
}
