import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  singUp(@Body() dto: SignUpDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.login(dto);
    res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
    return { message: 'ok' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(dto);
    res.setHeader('Authorization', '');
    return { message: 'ok' };
  }

  // 本来のrefresh方法ではないが、一旦これで
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.refreshToken(req.user.id);
    res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
    return { message: 'ok' };
  }
}
